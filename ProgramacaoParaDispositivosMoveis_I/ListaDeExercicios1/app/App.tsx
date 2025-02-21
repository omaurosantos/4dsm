import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Um from './src/screens/Um';
import Dois from './src/screens/Dois';
import Tres from './src/screens/Tres';
import Quatro from './src/screens/Quatro';
import Cinco from './src/screens/Cinco';
import Seis from './src/screens/Seis';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.customText}>Exercício 6</Text>
      <Seis />
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
