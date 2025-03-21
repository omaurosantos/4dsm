import React from "react";
import { View, Button, Alert, Linking, SafeAreaView, StyleSheet } from "react-native";

const Whatsapp: React.FC = () => {
    const sendWhatsapp = () => {
        // Número de telefone no formato internacional (com o código do país)
        const phoneNumber = '5512981475915';
        const message = 'Boa noite!\nCorpo da mensagem a ser enviada.\nAtenciosamente';

        // Criação do URL com o esquema do Whatsapp
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Verifica se a URL pode ser aberta (se o Whatsapp está instalado)
        Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                // Se suportado, abre o whatsapp com a mensagem
                Linking.openURL (url);
            } else {
                Alert.alert('Erro', 'O WhatsApp não está instalado neste dispositivo.');
            }
        })

        .catch((err) => console.error('Erro ao tentar abrir o WhatsApp', err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Enviar WhatsApp" onPress={sendWhatsapp} />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
});

export default Whatsapp;