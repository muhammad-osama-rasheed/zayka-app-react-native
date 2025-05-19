import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLACK_100,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {BOLD, MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import CustomInput from '../../components/input/CustomInput';
import ErrorMessage from '../../components/error/ErrorMessage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showErrorToast, showSuccessToast} from '../../utils/toast/ToastService';
import {clearCart} from '../../redux/slices/CartSlice';
import Loader from '../../components/loader/Loader';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../context/features/user/useUser';

const Checkout = () => {
  const navigation = useNavigation();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const [badAddress, setBadAddress] = useState('');
  const [badPhone, setBadPhone] = useState('');
  const [badAltPhone, setBadAltPhone] = useState('');

  const [loading, setLoading] = useState(false);

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const {token} = useUser();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const validation = () => {
    let validAddress = true;
    let validPhone = true;
    let validAltPhone = true;

    if (!address || address.trim() === '') {
      setBadAddress('Please enter your address.');
      validAddress = false;
    } else if (address.length < 5) {
      setBadAddress('Address should be at least 5 characters long.');
      validAddress = false;
    } else {
      setBadAddress('');
    }

    if (!phone || phone.trim() === '') {
      setBadPhone('Please enter your phone number.');
      validPhone = false;
    } else if (!/^\d{11}$/.test(phone)) {
      setBadPhone('Phone number must be exactly 11 digits.');
      validPhone = false;
    } else {
      setBadPhone('');
    }

    if (altPhone && altPhone !== '') {
      if (!/^\d{11}$/.test(altPhone)) {
        setBadAltPhone('Alternate number must be 11 digits.');
        validAltPhone = false;
      } else {
        setBadAltPhone('');
      }
    } else {
      setBadAltPhone('');
    }

    return validAddress && validPhone && validAltPhone;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userId = user._id;

      const products = cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
      }));

      if (userId) {
        const response = await fetch('https://zaykaapi.vercel.app/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            user: userId,
            products,
            address,
            phone,
            altPhone: altPhone ? altPhone : null,
            extraInfo: extraInfo ? extraInfo : null,
            totalPrice: totalPrice + 100,
          }),
        });

        const result = await response.json();

        const {success, message} = result;

        if (success) {
          showSuccessToast(message);
          dispatch(clearCart());
          navigation.replace('MyOrders');
        } else {
          showErrorToast(message);
        }
      }
    } catch (error) {
      showErrorToast('Something went wrong!');
      console.log(error);
    } finally {
      setLoading(false);
      stateEmpty();
    }
  };

  const stateEmpty = () => {
    setAddress('');
    setAltPhone('');
    setBadAddress('');
    setBadAltPhone('');
    setPhone('');
    setBadPhone('');
    setExtraInfo('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {loading && <Loader />}
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
            stateEmpty();
          }}>
          <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
        </TouchableOpacity>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.paymentContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: moderateVerticalScale(10),
              }}>
              <Text style={styles.text}>Sub Total</Text>
              <Text style={styles.value}>Rs {totalPrice}/-</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: moderateVerticalScale(10),
              }}>
              <Text style={styles.text}>GST (15%)</Text>
              <Text style={styles.value}>
                Rs {(totalPrice * 0.15).toFixed(0)}/-
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.text}>Delivery Fee</Text>
              <Text style={styles.value}>Rs 100/-</Text>
            </View>

            <View style={styles.seprator}></View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.text}>Total</Text>
              <Text style={styles.value}>Rs {totalPrice + 100}/-</Text>
            </View>
          </View>

          <View style={styles.cashContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.text}>Payment Mode</Text>
              <Text style={styles.value}>Cash on Delivery</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.detailsheading}>Details</Text>
            <CustomInput
              value={address}
              onChangeText={setAddress}
              label={'Address'}
              placeholder={'Enter your address'}
              icon={'map-marker'}
              bad={badAddress != ''}
            />
            {badAddress && <ErrorMessage error={badAddress} />}
            <CustomInput
              value={phone}
              onChangeText={setPhone}
              label={'Phone Number'}
              placeholder={'Enter your phone number'}
              icon={'phone'}
              bad={badPhone != ''}
            />
            {badPhone && <ErrorMessage error={badPhone} />}

            <CustomInput
              value={altPhone}
              onChangeText={setAltPhone}
              label={'Alternate Number (Optional)'}
              placeholder={'Enter another phone number'}
              icon={'phone-plus'}
              bad={badAltPhone != ''}
            />
            {badAltPhone && <ErrorMessage error={badAltPhone} />}

            <CustomInput
              value={extraInfo}
              onChangeText={setExtraInfo}
              label={'Extra Information (Optional)'}
              placeholder={'Any delivery notes, instructions?'}
              icon={'note'}
              multiline={true}
              numberOfLines={3}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomSheet}>
          <View style={styles.totalContainer}>
            <Text style={styles.countText}>
              <Text style={{color: ORANGE_500, fontFamily: BOLD}}>
                {/* {cartItems.length} */}
                {totalItems}
              </Text>{' '}
              Items
            </Text>
            <Text style={styles.totaltText}>
              Total: Rs{' '}
              <Text style={{color: ORANGE_500, fontFamily: BOLD}}>
                {totalPrice}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (validation()) {
                handleSubmit();
              }
            }}
            style={styles.innerContainer}>
            <Text style={styles.checkoutText}>Place Order</Text>
            <FontAwesome name={'angle-double-right'} size={18} color={WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  goBack: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
    marginBottom: moderateVerticalScale(20),
  },
  paymentContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: moderateScale(20),
    borderWidth: moderateScale(0.2),
    borderStyle: 'dashed',
    borderRadius: moderateScale(12),
  },
  text: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(11),
    color: BLACK_LIGHT,
  },
  value: {
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(11),
    color: BLACK_LIGHT,
  },
  seprator: {
    borderBottomWidth: moderateScale(0.2),
    borderColor: BLACK_100,
    marginVertical: moderateScale(20),
  },
  detailsheading: {
    width: '90%',
    alignSelf: 'center',
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(16),
    color: BLACK_LIGHT,
    marginTop: moderateVerticalScale(30),
    marginBottom: moderateVerticalScale(20),
  },
  formContainer: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: moderateVerticalScale(120),
  },
  bottomSheet: {
    width: '100%',
    position: 'absolute',
    backgroundColor: WHITE,
    height: scale(50),
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  innerContainer: {
    width: '70%',
    backgroundColor: ORANGE_500,
    height: '100%',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  checkoutText: {
    fontFamily: SEMIBOLD,
    color: WHITE,
    fontSize: moderateScale(14),
  },
  countText: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(12),
  },
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  totaltText: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    fontSize: moderateScale(11),
  },

  cashContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: moderateScale(20),
    borderWidth: moderateScale(0.2),
    borderStyle: 'dashed',
    borderRadius: moderateScale(12),
    marginTop: moderateVerticalScale(20),
  },
});
