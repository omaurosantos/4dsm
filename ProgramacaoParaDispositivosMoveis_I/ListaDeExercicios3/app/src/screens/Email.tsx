import React from "react";
import { StyleSheet } from 'react-native';
import { View, Button, Alert, Linking, SafeAreaView } from 'react-native';

const Mail: React.FC = () => {
    const sendEmail = () => {
        //Endereço de e-mail do destinatário
        const to = 'mauro.santos14@fatec.sp.gov.br';
        const subject = 'Teste de Envio de E-mail';

        //Corpo do e-mail
        const body = ('Caro Mauro, \n\nVeio por meio deste, conferir se o teste de envio de e-mail obteve sucesso.\n\nAtenciosamente,\n\nMauro Santos');

        //Criação do URL com o esquema 'mailto'

        const url = `mailto:${to}?subject${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        //Verifica se a URL pode ser aberta (se há um cliente de e-mail configurado no dispositivo)

        Linking.canOpenURL(url)
        .then ((supported) => {
            if (supported) {
                //Se o cliente de e-mail estiver configurado, abre o cliente de e-mail ja com 
                //o destinatário, assunto e o copro de e-mail preenchidos

                Linking.openURL(url);
            } else {
                Alert.alert('Erro', 'Nenhum aplicativo está configurado neste dispositivo.');
            }
        })

        .catch((err) => console.error('Erro ao tentar abrir o cliente de e-mail', err))
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Enviar E-mail" onPress={sendEmail} />
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

export default Mail;