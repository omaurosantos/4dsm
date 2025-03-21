import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function Oito() {
  const [images, setImages] = useState<string[]>([]);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]); // Adiciona o URI da imagem ao estado
      Alert.alert("Galeria", "Imagem selecionada com sucesso!");
    }
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]); // Adiciona o URI da imagem ao estado
      Alert.alert("Câmera", "Foto capturada com sucesso!");
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove a imagem pelo índice
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>📷 Minhas Imagens</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={openGallery}>
            <MaterialIcons name="photo" size={28} color="deepskyblue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
            <MaterialIcons name="photo-camera" size={28} color="deepskyblue" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.imageSectionTitle}>📷 Imagens Selecionadas:</Text>
      <ScrollView horizontal style={styles.imageScrollView}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  cameraButton: {
    marginLeft: 15,
  },
  imageSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  imageScrollView: {
    flexDirection: "row",
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 2,
  },
});