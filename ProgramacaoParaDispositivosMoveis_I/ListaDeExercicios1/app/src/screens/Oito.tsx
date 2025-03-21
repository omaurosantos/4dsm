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

const Oito = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [savedMail, setSavedMail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [savedRepeatPassowrd, setSavedRepeatPassword] = useState("");

  const handleSave = () => {
    setSavedMail(mail);
    setSavedPassword(password);
    setSavedRepeatPassword(repeatPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Cadastro</Text>
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          maxLength={8}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmação de senha"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
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
        {savedMail !== "" && savedPassword !== "" && (
          <View style={styles.result}>
            <Text>E-mail: {savedMail}</Text>
            <Text>Senha: {savedPassword}</Text>
            <Text>Confirmação de senha: {savedRepeatPassowrd}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
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
  },
  formContainer: {
    width: "100%",
    maxWidth: 270,
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "center",
  }
});

export default Oito;
