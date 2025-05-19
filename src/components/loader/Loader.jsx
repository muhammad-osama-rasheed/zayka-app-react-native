import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {WHITE, WHITE_200} from '../../utils/colors/Colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <LottieView
          source={require('../../utils/animations/loader.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loaderContainer: {
    width: scale(75),
    height: scale(75),
    borderRadius: moderateScale(200),
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(8),
    borderColor: WHITE_200,
  },
  lottie: {
    width: scale(45),
    height: scale(45),
  },
});

export default Loader;
