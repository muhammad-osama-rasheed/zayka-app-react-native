import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLACK_200,
  BLACK_LIGHT,
  ORANGE_500,
  ORANGE_600,
  WHITE,
  WHITE_100,
} from '../../utils/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BOLD, MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import useUser from '../../context/features/user/useUser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {showErrorToast, showSuccessToast} from '../../utils/toast/ToastService';
import {clearCart} from '../../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/loader/Loader';
import AuthCheck from '../../components/authCheck/AuthCheck';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {user, token} = useUser();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const clear = () => {
    if (cartItems.length > 0) {
      dispatch(clearCart());
      showSuccessToast('Cart cleared successfully!');
    } else {
      showErrorToast('Your cart is already empty', 'Cart is Empty');
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');

      navigation.replace('LoginScreen');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: user && token ? WHITE_100 : WHITE},
      ]}>
      <StatusBar backgroundColor={ORANGE_500} />
      {user && token ? (
        <>
          {loading && <Loader />}
          <ScrollView
            contentContainerStyle={{paddingBottom: moderateVerticalScale(80)}}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginTop: moderateVerticalScale(50)}}>
                <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
              </TouchableOpacity>

              <View style={{marginTop: moderateVerticalScale(20)}}>
                <Text style={styles.heading}>My Profile</Text>
              </View>
            </View>

            <View
              style={[
                styles.profileContainer,
                {marginTop: moderateVerticalScale(30)},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'account-circle'} size={40} color={ORANGE_500} />
                <View style={{marginLeft: moderateScale(8)}}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.email}>{user.email}</Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.profileContainer,
                {marginTop: moderateVerticalScale(10)},
              ]}>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorite')}
                  style={styles.itemContainer}>
                  <Icon name={'favorite'} size={18} color={ORANGE_500} />
                  <Text style={styles.text}>My Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MainBottom', {
                      screen: 'Menu',
                    })
                  }
                  style={styles.itemContainer}>
                  <Icon name="widgets" size={18} color={ORANGE_500} />
                  <Text style={styles.text}>Explore Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('MyOrders')}
                  style={styles.itemContainer}>
                  <Icon name={'receipt'} size={18} color={ORANGE_500} />
                  <Text style={styles.text}>My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Cart')}
                  style={styles.itemContainer}>
                  <Icon name="shopping-cart" size={18} color={ORANGE_500} />
                  <Text style={styles.text}>My Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => clear()}
                  style={styles.itemContainer}>
                  <Icon
                    name="remove-shopping-cart"
                    size={18}
                    color={ORANGE_500}
                  />
                  <Text style={styles.text}>Clear Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('AddReview')}
                  style={styles.itemContainer}>
                  <Ionicons name="chatbox" size={18} color={ORANGE_500} />
                  <Text style={styles.text}>Leave your feedback</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleLogout()}
                  style={styles.logoutIemContainer}>
                  <Ionicons name={'log-out'} size={18} color={ORANGE_500} />
                  <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <AuthCheck />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_100,
  },
  heading: {
    fontFamily: BOLD,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: moderateScale(15),
    color: BLACK_LIGHT,
  },
  profileContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: moderateScale(20),
    backgroundColor: WHITE,
    borderRadius: moderateScale(5),
    marginBottom: moderateVerticalScale(20),
  },
  name: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(15),
  },
  email: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    fontSize: moderateScale(12),
    width: scale(250),
  },
  text: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
    marginBottom: moderateScale(3),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(0.4),
    borderColor: BLACK_200,
    borderStyle: 'dashed',
    paddingBottom: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(25),
  },
  logoutIemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: BLACK_200,
    borderStyle: 'dashed',
  },
});
