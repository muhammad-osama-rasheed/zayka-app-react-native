import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utils/toast/ToastService';
import Loader from '../../../components/loader/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BgButton from '../../../components/button/bgButton/BgButton';
import {
  BLACK_200,
  BLACK_500,
  ORANGE_500,
  WHITE,
} from '../../../utils/colors/Colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {MEDIUM, SEMIBOLD} from '../../../utils/font/Font';
import CustomInput from '../../../components/input/CustomInput';
import ErrorMessage from '../../../components/error/ErrorMessage';
const ChangePassword = () => {
  const route = useRoute();
  const email = route.params.email;

  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [badConfirmPassword, setBadConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const validation = () => {
    let validPassword = true;
    let validConfirmPassword = true;

    if (password === '') {
      setBadPassword('Please enter new password.');
      validPassword = false;
    } else if (password.length < 6) {
      setBadPassword('Password should be at least 6 characters long.');
      validPassword = false;
    } else {
      setBadPassword('');
      validPassword = true;
    }

    if (confirmPassword === '') {
      setBadConfirmPassword('Please enter password.');
      validConfirmPassword = false;
    } else if (confirmPassword !== password) {
      setBadConfirmPassword('Passwords do not match.');
      validConfirmPassword = false;
    } else if (confirmPassword === password) {
      setBadConfirmPassword('');
      validConfirmPassword = true;
    }

    return validPassword && validConfirmPassword;
  };

  const emptyState = () => {
    setPassword('');
    setBadPassword('');
    setConfirmPassword('');
    setBadConfirmPassword('');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!email) {
        showErrorToast('Email not found. Please login again.');
        setLoading(false);
        return;
      }

      const response = await fetch(
        'https://zaykaapi.vercel.app/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: password,
            email,
          }),
        },
      );

      const result = await response.json();

      const {success, message} = result;

      if (success) {
        showSuccessToast(message || 'Password reset successfully.');
        setTimeout(() => {
          navigation.replace('LoginScreen');
        }, 500);
      } else {
        showErrorToast(message || 'Failed to reset password.');
        setTimeout(() => {
          navigation.replace('LoginScreen');
        }, 300);
      }
    } catch (error) {
      console.log(error);
      showErrorToast('Failed to reset password.');
    } finally {
      setLoading(false);
      emptyState();
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}

      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} size={24} color={ORANGE_500} />
        </TouchableOpacity>

        <Text style={styles.heading}>Change Password</Text>

        <Text style={styles.text}>
          Please enter your new password. Make sure it is strong and easy to
          remember.
        </Text>

        <View>
          <CustomInput
            value={password}
            onChangeText={setPassword}
            type={'password'}
            label={'New Password'}
            placeholder={'ex. abc123'}
            icon={'lock'}
            bad={badPassword !== ''}
          />
          {badPassword && <ErrorMessage error={badPassword} />}

          <CustomInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type={'password'}
            label={'Confirm Password'}
            placeholder={'ex. abc123'}
            icon={'check-circle'}
            bad={badConfirmPassword !== ''}
          />
          {badConfirmPassword && <ErrorMessage error={badConfirmPassword} />}
        </View>

        <View>
          <BgButton
            title={'Change Password'}
            onPress={() => {
              if (validation()) {
                handleSubmit();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: moderateVerticalScale(40),
  },

  heading: {
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(20),
    marginLeft: moderateScale(5),
    paddingVertical: moderateVerticalScale(20),
  },
  text: {
    fontFamily: MEDIUM,
    marginLeft: moderateScale(5),
    paddingBottom: moderateVerticalScale(40),
    fontSize: moderateScale(15),
    color: BLACK_500,
    width: '80%',
  },
});
