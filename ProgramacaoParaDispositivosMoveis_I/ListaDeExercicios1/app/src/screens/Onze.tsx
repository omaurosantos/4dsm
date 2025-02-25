import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from "react-native";
import Constants from "expo-constants";

const Onze = () => {
  const handleSave = () => {
    // Função de salvar
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Image
            style={styles.logo}
            source={require("../../assets/fatec_jacarei.png")}
        />
        <Text style={styles.titulo}>HOME</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.leftButtons}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Um</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Três</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Cinco</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Sete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Nove</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Dois</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Quatro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Seis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Oito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text>Dez</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 140,
        height: 140,
        resizeMode: "contain", // Garante que a imagem seja enquadrada sem cortar
        alignSelf: "center",
    },
  titulo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftButtons: {
    flex: 0.5,
    marginRight: 10,
  },
  rightButtons: {
    flex: 0.5,
  },
  button: {
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10, // Espaço vertical entre os botões
  },
});

export default Onze;
