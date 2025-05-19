import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {ORANGE_500, BLACK_LIGHT, WHITE} from '../../utils/colors/Colors';
import {SEMIBOLD, MEDIUM} from '../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';

const AuthCheckModal = ({isVisible, setIsVisible}) => {
  const navigation = useNavigation();

  return (
    <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsVisible(false)}>
          <Icon name="close" size={24} color={ORANGE_500} />
        </TouchableOpacity>

        <LottieView
          source={require('../../utils/animations/auth.json')}
          autoPlay
          loop={false}
          style={{width: 140, height: 140}}
        />
        <Text style={styles.title}>Please login or sign up to continue!</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btn, {marginRight: moderateScale(10)}]}
            onPress={() => {
              setIsVisible(false);
              setTimeout(() => {
                navigation.navigate('SignupScreen');
              }, 500);
            }}>
            <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsVisible(false);
              setTimeout(() => {
                navigation.navigate('LoginScreen');
              }, 500);
            }}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AuthCheckModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: moderateScale(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: moderateVerticalScale(10),
    right: moderateScale(10),
    zIndex: 1,
  },
  title: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(15),
    color: BLACK_LIGHT,
    marginVertical: moderateVerticalScale(20),
    textAlign: 'center',
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
});
