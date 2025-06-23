import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPrevisao from '../components/CardPrevisao';
import { DADOS_SIMULADOS_CIDADES, dadosClimaticos } from '../data/dadosSimulados';

const HomeScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<dadosClimaticos[]>([]);

  useEffect(() => {
    setWeatherData(DADOS_SIMULADOS_CIDADES);
  }, []);

  const handleMoreInfoPress = () => {
    Linking.openURL('https://www.climatempo.com.br');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tempo Agora</Text>

        <View style={styles.githubContainer}>
          <Icon name="github" size={16} color="#1a1a1a" style={{ marginRight: 6 }} />
          <Text style={styles.headerSubTitle}>@omaurosantos</Text>
        </View>
      </View>

      <FlatList
        data={weatherData}
        renderItem={({ item }) => <CardPrevisao data={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.infoButton} onPress={handleMoreInfoPress}>
        <Text style={styles.infoButtonText}>Mais Informações</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  githubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  list: {
    paddingBottom: 20,
  },
  infoButton: {
    backgroundColor: '#007BFF',
    margin: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
