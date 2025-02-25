import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Um from './src/screens/Um';
import Dois from './src/screens/Dois';
import Tres from './src/screens/Tres';
import Quatro from './src/screens/Quatro';
import Cinco from './src/screens/Cinco';
import Seis from './src/screens/Seis';
import Sete from './src/screens/Sete';
import Oito from './src/screens/Oito';
import Nove from './src/screens/Nove';
import Dez from './src/screens/Dez';
import Onze from './src/screens/Onze';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.customText}>Exercício 11</Text>
      <Onze />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 50
  },
});
