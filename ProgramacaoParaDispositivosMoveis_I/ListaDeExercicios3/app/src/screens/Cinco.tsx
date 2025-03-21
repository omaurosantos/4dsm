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
} from "react-native";
import * as Contacts from "expo-contacts";

interface SimpleContact {
  id: string;
  name: string;
  phoneNumber: string | null;
}

export default function Cicno() {
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
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers], // Obtendo nome e números de telefone
    });

    if (data.length > 0) {
      // Filtra os contatos e pega o primeiro nome e o número de telefone
      const formattedContacts: SimpleContact[] = data.map((contact) => ({
        id: contact.id ?? Math.random().toString(),
        name: contact.name?.split(" ")[0] || "Desconhecido", // Pegando apenas o primeiro nome
        phoneNumber: contact.phoneNumbers?.[0]?.number || "Sem número", // Pegando o primeiro número de telefone
      }));

      setContacts(formattedContacts);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Lista de Contatos (Primeiro Nome + Número)</Text>

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
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
