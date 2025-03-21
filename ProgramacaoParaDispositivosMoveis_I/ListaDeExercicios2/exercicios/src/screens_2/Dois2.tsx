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

type Dois2ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dois2"
>;

interface Props {
  navigation: Dois2ScreenNavigationProp;
}

const Dois2: React.FC<Props> = ({ navigation }) => {
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

export default Dois2;