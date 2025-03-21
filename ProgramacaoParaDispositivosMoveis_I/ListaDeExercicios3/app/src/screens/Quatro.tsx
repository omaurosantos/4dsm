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

export default function App() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  // Função para pedir permissão no Android
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
    return true; // No iOS, a permissão é gerenciada automaticamente pelo Expo
  };

  // Função para obter os contatos
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
      // Filtrando os contatos que começam com "C"
      const filteredContacts = data.filter(
        (contact) => contact.name && contact.name.startsWith("C")
      );

      setContacts(filteredContacts);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📞 Contatos que começam com "C"</Text>

      <Button title="📋 Carregar Contatos" onPress={getContacts} />

      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && (
              <Text style={styles.contactPhone}>
                {item.phoneNumbers[0].number}
              </Text>
            )}
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
    color: "#555",
  },
});
