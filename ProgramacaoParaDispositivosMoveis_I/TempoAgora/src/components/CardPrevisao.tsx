import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dadosClimaticos } from '../data/dadosSimulados';

type CardPrevisaoProps = {
  data: dadosClimaticos;
};

const CardPrevisao: React.FC<CardPrevisaoProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cityText}>{data.cidade}</Text>
      <View style={styles.mainInfo}>
        <MaterialCommunityIcons name={data.iconeCondicao} size={64} color="#333" />
        <Text style={styles.temperatureText}>{data.temperatura}°C</Text>
      </View>
      <Text style={styles.conditionText}>{data.condicao}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="water-percent" size={24} color="#555" />
          <Text style={styles.detailText}>{data.umidade}%</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-windy" size={24} color="#555" />
          <Text style={styles.detailText}>{data.velocidadeVento} km/h</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  temperatureText: {
    fontSize: 56,
    fontWeight: '200',
    color: '#333',
  },
  conditionText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default CardPrevisao;