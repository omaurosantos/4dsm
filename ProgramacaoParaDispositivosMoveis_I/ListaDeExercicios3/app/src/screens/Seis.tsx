import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface SimpleContact {
  id: string;
  name: string;
  phoneNumber: string | null;
}

export default function Seis() {
  const [contacts, setContacts] = useState<SimpleContact[]>([]);

  const requestContactsPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Permissão para acessar contatos",
          message: "Precisamos de acesso aos seus contatos para exibi-los.",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "Permitir",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getContacts = async () => {
    const hasPermission = await requestContactsPermission();

    if (!hasPermission) {
      Alert.alert("Erro", "Permissão negada para acessar contatos.");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      const formattedContacts: SimpleContact[] = data.map((contact) => ({
        id: contact.id ?? Math.random().toString(),
        name: contact.name?.split(" ")[0] || "Desconhecido",
        phoneNumber: contact.phoneNumbers?.[0]?.number || "Sem número",
      }));

      setContacts(formattedContacts);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      Alert.alert("Galeria", "Imagem selecionada com sucesso!");
    }
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      Alert.alert("Câmera", "Foto capturada com sucesso!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>📋 Lista de Contatos</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={openGallery}>
            <MaterialIcons name="photo" size={28} color="deepskyblue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
            <MaterialIcons name="photo-camera" size={28} color="deepskyblue" />
          </TouchableOpacity>
        </View>
      </View>

      <Button title="📋 Carregar Contatos" onPress={getContacts} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
          </View>
        )}
      />
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
  contactItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 16,
    color: "#666",
  },
});
