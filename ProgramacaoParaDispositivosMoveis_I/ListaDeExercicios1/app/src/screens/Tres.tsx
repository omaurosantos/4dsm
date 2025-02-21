import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Tres = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.left} />
        <View style={styles.right} >
          <View style={styles.top} />
          <View style={styles.bottom} />
        </View>
      </View>
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
    flexDirection: 'row',
  },
  bottomHalf: {
    flex: 0.5,
    backgroundColor: 'salmon',
  },
  left: {
    flex: 0.5,
    backgroundColor: 'lime',
  },
  right: {
    flex: 0.5,
    flexDirection: 'column',
  },
  top: {
    flex: 0.5,
    backgroundColor: 'teal',
  },
  bottom: {
    flex: 0.5,
    backgroundColor: 'skyblue',
  }
});

export default Tres;