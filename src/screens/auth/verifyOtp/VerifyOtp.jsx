import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  BLACK_200,
  BLACK_500,
  ORANGE_500,
  WHITE,
} from '../../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {MEDIUM, SEMIBOLD} from '../../../utils/font/Font';
import BgButton from '../../../components/button/bgButton/BgButton';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../utils/toast/ToastService';
import Loader from '../../../components/loader/Loader';
import {useRoute} from '@react-navigation/native';

const VerifyOtp = ({navigation}) => {
  const route = useRoute();
  const email = route.params.email;

  const [otp, setOtp] = useState(['', '', '', '']);

  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const optCode = otp.join('');

      if (optCode.length !== 4) {
        showErrorToast('Please enter the complete OTP.');
        return;
      }

      setLoading(true);

      const response = await fetch(
        'https://zaykaapi.vercel.app/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: optCode,
            email,
          }),
        },
      );

      const result = await response.json();
      const {success, message} = result;

      console.log(result);

      if (success) {
        showSuccessToast(message || 'OTP Verified.');
        setTimeout(
          () => navigation.replace('ChangePassword', {email: email}),
          500,
        );
      } else {
        showErrorToast(message || 'Failed to verify OTP.');
        setTimeout(() => navigation.replace('LoginScreen'), 300);
      }
    } catch (error) {
      console.log(error);
      showErrorToast('Failed to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={async () => {
            navigation.goBack();
          }}>
          <Icon name={'arrow-back'} size={24} color={ORANGE_500} />
        </TouchableOpacity>

        <Text style={styles.heading}>Verification Code</Text>

        <Text style={styles.text}>
          We have sent the verification code to your email address.
        </Text>

        <View style={styles.boxContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.box}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={text => handleChange(text, index)}
              ref={ref => (inputs.current[index] = ref)}
              autoFocus={index === 0}
              selectionColor={ORANGE_500}
            />
          ))}
        </View>

        <View>
          <BgButton title={'Verify OTP'} onPress={() => handleSubmit()} />
        </View>
      </View>
    </View>
  );
};

export default VerifyOtp;

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
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: moderateVerticalScale(30),
    gap: moderateScale(10),
  },
  box: {
    borderWidth: moderateScale(1),
    borderColor: BLACK_200,
    width: moderateScale(50),
    height: moderateScale(50),
    textAlign: 'center',
    fontSize: moderateScale(20),
    borderRadius: moderateScale(5),
  },
});
