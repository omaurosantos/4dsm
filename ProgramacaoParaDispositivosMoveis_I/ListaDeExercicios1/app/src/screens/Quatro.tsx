import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import logo from "../../assets/adaptive-icon.png";
import LogoImage from '../components/LogoImage';

const Quatro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.left} >
          <LogoImage />
        </View>
        <View style={styles.right}>
          <View style={styles.top} >
            <LogoImage />
          </View>
          <View style={styles.bottom} >
            <LogoImage />
          </View>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <LogoImage />
      </View>
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
    backgroundColor: 'crimson',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default Quatro;