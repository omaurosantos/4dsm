import React from "react";
import { StyleSheet } from 'react-native';
import { View, Button, Alert, Linking, SafeAreaView } from 'react-native';

const Maps: React.FC = () => {
    const openMap = () => {
        const latitude = -23.304064922121036;
        const longitude = -45.96265990349741;
        const label = "Jacareí Shopping Center";

        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${encodeURIComponent(label)}`;

        Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL (url);
            } else {
                Alert.alert('Erro', 'Não foi possível abrir o Google Maps.')
            }
        })

        .catch((err) => console.error('Erro ao tentar abrir o Google Maps', err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Google Maps" onPress={openMap} />
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

export default Maps;