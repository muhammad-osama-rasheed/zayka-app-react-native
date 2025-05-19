import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {BLACK_LIGHT, ORANGE_500, WHITE} from '../../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../../../components/input/CustomInput';
import BgButton from '../../../components/button/bgButton/BgButton';
import {useNavigation} from '@react-navigation/native';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utils/toast/ToastService';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Loader from '../../../components/loader/Loader';
import {BOLD, REGULAR, SEMIBOLD} from '../../../utils/font/Font';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [badName, setBadName] = useState('');

  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const validation = () => {
    let validName = true;
    let validEmail = true;
    let validPassword = true;

    if (name === '') {
      setBadName('Please enter your name.');
      validName = false;
    } else if (name !== '' && name.length < 3) {
      setBadName('Name should be at least 3 characters long.');
      validName = false;
    } else {
      setBadName('');
      validName = true;
    }

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

    return validName && validEmail && validPassword;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zaykaapi.vercel.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      const {success, message} = result;

      if (success) {
        showSuccessToast('Congratulations!', message);
        setTimeout(() => {
          navigation.navigate('LoginScreen');
        }, 1000);
      } else {
        showErrorToast(message);
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      stateEmpty();
      setLoading(false);
    }
  };

  const stateEmpty = () => {
    setName('');
    setBadName('');
    setEmail('');
    setBadEmail('');
    setPassword('');
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

          <TouchableOpacity
            style={styles.backIconBtn}
            onPress={() => {
              navigation.goBack();
              stateEmpty();
            }}>
            <Icon name="arrow-back" size={24} color="#FBAE3C" />
          </TouchableOpacity>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Create Your,</Text>
            <Text style={styles.welcomeText}>account!</Text>

            <View style={styles.noAccountContainer}>
              <Text style={styles.noAccountText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                  stateEmpty();
                }}>
                <Text style={styles.signupText}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formConatiner}>
            <CustomInput
              value={name}
              onChangeText={setName}
              label={'Name'}
              placeholder={'ex. abcd'}
              icon={'account-circle'}
              bad={badName !== ''}
            />
            {badName && <ErrorMessage error={badName} />}

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

            <View style={styles.btnContainer}>
              <BgButton
                title={'Signup'}
                onPress={() => {
                  if (validation()) {
                    handleSubmit();
                  }
                }}
              />
            </View>
          </View>

          <Image
            source={require('../../../images/4.png')}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  topImage: {
    width: scale(150),
    height: scale(150),
    position: 'absolute',
    top: 0,
    right: 0,
  },

  bottomImage: {
    width: scale(150),
    height: scale(150),
  },
  scrollContainer: {
    flexGrow: 1,
  },

  welcomeContainer: {
    padding: moderateScale(10),
  },

  welcomeText: {
    fontFamily: BOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(28),
  },

  backIconBtn: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateVerticalScale(30),
    paddingBottom: moderateVerticalScale(5),
  },
  noAccountContainer: {
    paddingVertical: moderateVerticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    fontFamily: REGULAR,
    fontSize: moderateScale(14),
  },

  signupText: {
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(14),
    color: ORANGE_500,
  },
  formConatiner: {
    paddingTop: moderateVerticalScale(50),
  },

  btnContainer: {
    marginVertical: moderateVerticalScale(40),
  },
});
