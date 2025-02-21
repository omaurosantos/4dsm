import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Um = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf} />
      <View style={styles.bottomHalf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  topHalf: {
    flex: 0.5,
    backgroundColor: 'crimson',
  },
  bottomHalf: {
    flex: 0.5,
    backgroundColor: 'salmon',
  },
});

export default Um;