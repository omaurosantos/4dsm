import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import logo from "../../assets/adaptive-icon.png";

const showAlert = () => {
  Alert.alert("Boa noite!");
};

const Cinco = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.left}>
          <TouchableOpacity onPress={showAlert}>
            <Image source={logo} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <View style={styles.top}>
            <TouchableOpacity onPress={showAlert}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={showAlert}>
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <TouchableOpacity onPress={showAlert}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 0.5,
    backgroundColor: 'purple',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottom: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
});

export default Cinco;