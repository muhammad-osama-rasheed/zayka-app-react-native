import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ORANGE_500, WHITE} from '../../../utils/colors/Colors';
import {moderateVerticalScale} from 'react-native-size-matters';

import CustomInput from '../../../components/input/CustomInput';
import BgButton from '../../../components/button/bgButton/BgButton';
import {useNavigation} from '@react-navigation/native';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utils/toast/ToastService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader/Loader';
import ErrorMessage from '../../../components/error/ErrorMessage';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import useFavorites from '../../../context/features/favorites/useFavorites';
import useUser from '../../../context/features/user/useUser';
import {MEDIUM} from '../../../utils/font/Font';

const LoginScreen = () => {
  const {localUser} = useUser();

  const navigation = useNavigation();

  const {getFavorites} = useFavorites();

  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zaykaapi.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      const {success, message, jwtToken, error, userData} = result;

      if (success) {
        showSuccessToast(message);

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('token', jwtToken);

        navigation.replace('MainDrawer');
        localUser();
        getFavorites();
      } else if (error && error.details) {
        const details = error.details[0].message;
        showErrorToast(details);
      } else {
        showErrorToast(message);
      }
    } catch (error) {
      console.log('Login error:', error);
      showErrorToast('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      emptyState();
    }
  };

  const validation = () => {
    let validEmail = true;
    let validPassword = true;

    if (email === '') {
      setBadEmail('Please enter your email.');
      validEmail = false;
    } else if (
      email !== '' &&
      !/^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|szabist\.pk)$/.test(
        email,
      )
    ) {
      setBadEmail('Please enter a valid email.');
      validEmail = false;
    } else {
      setBadEmail('');
      validEmail = true;
    }

    if (password === '') {
      setBadPassword('Please enter your password.');
      validPassword = false;
    } else if (password.length < 6) {
      setBadPassword('Password should be at least 6 characters long.');
      validPassword = false;
    } else {
      setBadPassword('');
      validPassword = true;
    }

    return validEmail && validPassword;
  };

  const emptyState = () => {
    setEmail('');
    setPassword('');
    setBadEmail('');
    setBadPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require('../../../images/3.png')}
            style={styles.topImage}
            resizeMode="contain"
          />

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hi, Welcome</Text>
            <Text style={styles.welcomeText}>Back!</Text>

            <View style={styles.noAccountContainer}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignupScreen');
                  emptyState();
                }}>
                <Text style={styles.signupText}> sign up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formConatiner}>
            <CustomInput
              value={email}
              onChangeText={setEmail}
              label={'Email'}
              placeholder={'ex. abc@gmail.com'}
              icon={'email'}
              bad={badEmail !== ''}
            />
            {badEmail && <ErrorMessage error={badEmail} />}

            <CustomInput
              value={password}
              onChangeText={setPassword}
              type={'password'}
              label={'Password'}
              placeholder={'ex. abc123'}
              icon={'lock'}
              bad={badPassword !== ''}
            />
            {badPassword && <ErrorMessage error={badPassword} />}

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => setForgotModal(true)}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
              <BgButton
                title={'Login'}
                onPress={() => {
                  if (validation()) {
                    handleSubmit();
                  }
                }}
              />

              <Text
                onPress={() => {
                  localUser();
                  navigation.navigate('MainDrawer');
                }}
                style={styles.skipText}>
                Skip Now
              </Text>
            </View>
          </View>

          <Image
            source={require('../../../images/4.png')}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      <ForgotPassword
        forgotModal={forgotModal}
        setForgotModal={setForgotModal}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  topImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  bottomImage: {
    width: 150,
    height: 150,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  welcomeContainer: {
    padding: 10,
    paddingTop: 70,
  },

  welcomeText: {
    fontFamily: 'Quicksand-Bold',
    color: '#000000B3',
    fontSize: 28,
  },

  backIconBtn: {
    paddingHorizontal: 5,
    paddingTop: 30,
    paddingBottom: 5,
  },
  noAccountContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
  },

  signupText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 14,
    color: '#FBAE3C',
  },
  formConatiner: {
    paddingTop: 50,
  },
  forgotPasswordContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
  },

  forgotPasswordText: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 13,
    textAlign: 'right',
    color: '#FBAE3C',
  },
  btnContainer: {
    marginVertical: moderateVerticalScale(40),
  },
  skipText: {
    marginTop: moderateVerticalScale(15),
    textAlign: 'center',
    fontFamily: MEDIUM,
    color: ORANGE_500,
  },
});
