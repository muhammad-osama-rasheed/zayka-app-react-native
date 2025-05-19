import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ORANGE_600,
  BLACK_LIGHT,
  WHITE,
  ORANGE_500,
} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {SEMIBOLD, REGULAR, MEDIUM} from '../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

const AuthCheck = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
      </TouchableOpacity>

      <View style={styles.container}>
        <LottieView
          source={require('../../utils/animations/auth.json')}
          autoPlay={true}
          loop={false}
          style={{width: 140, height: 140}}
        />
        <Text style={styles.title}>Please login or sign up to continue!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btn, {marginRight: moderateScale(10)}]}
            onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(15),
    color: BLACK_LIGHT,
    marginBottom: moderateVerticalScale(20),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: ORANGE_500,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(6),
    borderRadius: moderateScale(8),
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: WHITE,
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(12),
  },
  goBack: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
  icon: {
    marginBottom: moderateVerticalScale(10),
  },
});
