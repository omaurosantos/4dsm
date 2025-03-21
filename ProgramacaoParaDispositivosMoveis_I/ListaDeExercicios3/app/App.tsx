import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Cinco from './src/screens/Cinco';
import Seis from './src/screens/Seis';
import Sete from './src/screens/Sete';
import Oito from './src/screens/Oito';
import Sms from './src/screens/Sms';
import Whatsapp from './src/screens/Whatsapp';
import Mail from './src/screens/Email';
import Maps from './src/screens/Maps';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Maps">
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
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