/*import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Um2ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Um2"
>;

interface Props {
  navigation: Um2ScreenNavigationProp;
}

const Um2: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Tela Um2</Text>
        <Text style={styles.description}>
          Esta é uma nova tela criada para o Exercício 2!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Onze")}
        >
          <Text style={styles.buttonText}>Voltar para Onze</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Um2;

*/
/*
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Um2ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Um2"
>;

interface Props {
  navigation: Um2ScreenNavigationProp;
}

const Um2: React.FC<Props> = ({ navigation }) => {
  // Definindo os botões com rotas válidas de RootStackParamList
  const buttons: { name: string; route: keyof RootStackParamList }[] = [
    { name: "Um", route: "Um" },
    { name: "Dois", route: "Dois" },
    { name: "Três", route: "Tres" },
    { name: "Quatro", route: "Quatro" },
    { name: "Cinco", route: "Cinco" },
    { name: "Seis", route: "Seis" },
    { name: "Sete", route: "Sete" },
    { name: "Oito", route: "Oito" },
    { name: "Nove", route: "Nove" },
    { name: "Dez", route: "Dez" },
    //{ name: "Onze", route: "Onze" }, // Adicionado para voltar ou acessar Onze
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../components/fatec-logo.png")} // Verifique o caminho da imagem
          style={styles.logo}
        />
        <Text style={styles.homeText}>HOME</Text>
        <View style={styles.buttonsContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => navigation.navigate(button.route)}
            >
              <Text style={styles.buttonText}>{button.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },
  homeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "45%",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Um2;*/