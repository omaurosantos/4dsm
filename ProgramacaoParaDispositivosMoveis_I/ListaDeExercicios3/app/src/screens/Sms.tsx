import React from "react";
import { View, Button, Alert, Linking, SafeAreaView, StyleSheet } from "react-native";

const Sms: React.FC = () => {
    const sendSms = () => {
        const phoneNumber = '12991641464';
        const message = 'Boa noite!\nCorpo da mensagem a ser enviada.\nAtenciosamente';

        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`; // Removido espaço extra após "sms:"

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Erro', 'Este dispositivo não suporta o envio de SMS.');
                }
            })
            .catch((err) => console.error('Erro ao enviar SMS', err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Enviar SMS" onPress={sendSms} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
});

export default Sms;