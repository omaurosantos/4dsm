import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Linking,
  Alert,
} from "react-native";
import Constants from "expo-constants";

interface OpenURLButtonProps {
  url: string;
  children: string;
}

const OpenURLButton: React.FC<OpenURLButtonProps> = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não foi possível abrir este link: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.buttonContainer}>
      <Button title={children} onPress={handlePress} color="#d32f2f" />
    </View>
  );
};

const Tres = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Fatec Jacareí</Text>
        <Text style={styles.subtitulo}>Acompanhe a Fatec Jacareí nas redes sociais:</Text>
        <OpenURLButton url={"https://www.instagram.com/fatec_jacarei"}>
          Clique aqui
        </OpenURLButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d32f2f",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 15,
    borderRadius: 5,
    overflow: "hidden",
  },
  divisor: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 15,
  },
});

export default Tres;
