import {StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {BLACK_LIGHT, ORANGE_100} from '../../utils/colors/Colors';
import {SEMIBOLD} from '../../utils/font/Font';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainDrawer');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Animatable.Image
        animation="zoomIn"
        duration={1500}
        style={styles.logo}
        source={require('../../images/logo.png')}
      />
      <Animatable.Text
        animation="slideInUp"
        duration={1500}
        style={styles.slogan}>
        Zayka – A Taste You'll Relish!
      </Animatable.Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scale(120),
    height: scale(120),
    objectFit: 'contain',
  },
  slogan: {
    fontSize: moderateScale(16),
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    position: 'absolute',
    bottom: moderateVerticalScale(80),
  },
});
