import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
  WHITE_600,
} from '../../../utils/colors/Colors';
import {SEMIBOLD} from '../../../utils/font/Font';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../../../components/input/CustomInput';
import ErrorMessage from '../../../components/error/ErrorMessage';
import BgButton from '../../../components/button/bgButton/BgButton';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utils/toast/ToastService';
import Loader from '../../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = ({forgotModal, setForgotModal}) => {
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setForgotModal(false);
      setLoading(true);

      const response = await fetch(
        'https://zaykaapi.vercel.app/auth/send-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const result = await response.json();

      const {success, message} = result;

      if (success) {
        showSuccessToast(message || 'OTP sent to your email.');
        navigation.navigate('VerifyOtp', {email: email});
      } else {
        showErrorToast(message || 'Failed to sent OTP.');
      }
    } catch (error) {
      console.log('error: ', error);
      showErrorToast('Failed to reset password.');
    } finally {
      setLoading(false);
      emptyState();
    }
  };

  const validation = () => {
    let validEmail = true;

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

    return validEmail;
  };

  const emptyState = () => {
    setEmail('');
    setBadEmail('');
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        isVisible={forgotModal}
        style={{margin: 0}}
        onBackButtonPress={() => setForgotModal(false)}
        onBackdropPress={() => setForgotModal(false)}
        backdropOpacity={0.3}
        swipeDirection={'down'}
        onSwipeComplete={() => setForgotModal(false)}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.heading}>Forgot Password</Text>
            <TouchableOpacity
              onPress={() => {
                setForgotModal(false);
                emptyState();
              }}>
              <Icon name={'cancel'} size={18} color={ORANGE_500} />
            </TouchableOpacity>
          </View>

          <View style={{paddingVertical: 10}}>
            <CustomInput
              value={email}
              onChangeText={setEmail}
              label={'Email'}
              placeholder={'ex. abc@gmail.com'}
              icon={'email'}
              bad={badEmail !== ''}
            />
            {badEmail && <ErrorMessage error={badEmail} />}

            <BgButton
              title={'Submit'}
              onPress={() => {
                if (validation()) {
                  handleSubmit();
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  bottomSheet: {
    width: '100%',
    height: moderateVerticalScale(240),
    backgroundColor: WHITE,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: moderateScale(0.3),
    borderStyle: 'dashed',
    borderColor: WHITE_600,
  },
  heading: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(14),
  },
});
