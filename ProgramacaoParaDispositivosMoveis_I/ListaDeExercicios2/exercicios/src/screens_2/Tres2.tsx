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
import { Ionicons } from "@expo/vector-icons"; // Importando Ionicons com tipo
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Tres2ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Tres2"
>;

interface Props {
  navigation: Tres2ScreenNavigationProp;
}

// Tipo explícito para os ícones usados
type IconName =
  | "home"
  | "star"
  | "heart"
  | "cube"
  | "flag"
  | "time"
  | "musical-note"
  | "eye"
  | "chatbubble"
  | "settings";

const Tres2: React.FC<Props> = ({ navigation }) => {
  const buttons: { name: string; route: keyof RootStackParamList; icon: IconName }[] = [
    { name: "Um", route: "Um", icon: "home" },
    { name: "Dois", route: "Dois", icon: "star" },
    { name: "Três", route: "Tres", icon: "heart" },
    { name: "Quatro", route: "Quatro", icon: "cube" },
    { name: "Cinco", route: "Cinco", icon: "flag" },
    { name: "Seis", route: "Seis", icon: "time" },
    { name: "Sete", route: "Sete", icon: "musical-note" },
    { name: "Oito", route: "Oito", icon: "eye" },
    { name: "Nove", route: "Nove", icon: "chatbubble" },
    { name: "Dez", route: "Dez", icon: "settings" },
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
              <Ionicons
                name={button.icon}
                size={20}
                color="#000"
                style={styles.icon}
              />
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
    flexDirection: "row",
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Tres2;