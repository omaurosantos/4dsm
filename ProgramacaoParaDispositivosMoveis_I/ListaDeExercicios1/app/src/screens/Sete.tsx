import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

const Sete = () => {
  const [mail, setMail] = useState("");
  const [age, setAge] = useState("");
  const [savedMail, setSavedMail] = useState("");
  const [savedAge, setSavedAge] = useState("");

  const handleSave = () => {
    setSavedMail(mail);
    setSavedAge(age);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={mail}
          onChangeText={setMail}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={age}
          onChangeText={setAge}
          secureTextEntry={true}
          maxLength={8}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.LoginButton} onPress={handleSave}>
            <Text>Logar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RegisterButton} onPress={handleSave}>
            <Text>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
        {savedMail !== "" && savedAge !== "" && (
          <View style={styles.result}>
            <Text>E-mail: {savedMail}</Text>
            <Text>Senha: {savedAge}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    },
  LoginButton: {
    flex: 0.5,
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  RegisterButton: {
    flex: 0.5,
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  }
});

export default Sete;
