import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from "../../assets/adaptive-icon.png";

const LogoImage = () => {
  return (
    <Image
      source={logo}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default LogoImage;