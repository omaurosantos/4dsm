import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import Constants from "expo-constants";

import { NavigationProp } from '@react-navigation/native';

const Um = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const handleSave = () => {
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Um</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Três</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Cinco</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Sete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Nove</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Dois</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Quatro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Seis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Oito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
              <Text>Dez</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Ir para Outra Tela"
          onPress={() => navigation.navigate('OutraTela')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 140,
        height: 140,
        resizeMode: "contain",
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
  customText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Um;
