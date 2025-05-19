import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  BLACK_200,
  BLACK_300,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {BOLD, MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  decreamentQuantity,
  deleteFromCart,
  increamentQuantity,
} from '../../redux/slices/CartSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import useUser from '../../context/features/user/useUser';
import AuthCheck from '../../components/authCheck/AuthCheck';

const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const {user, token} = useUser();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ORANGE_500} />

      {user && token ? (
        <>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: moderateVerticalScale(50)}}>
              <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
            </TouchableOpacity>

            <View style={{marginTop: moderateVerticalScale(20)}}>
              <Text style={styles.heading}>My Cart</Text>
            </View>
          </View>

          {cartItems.length > 0 ? (
            <>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: moderateVerticalScale(70),
                }}>
                <View style={styles.cartItemsContainer}>
                  {cartItems.map((item, index) => (
                    <View
                      style={{
                        marginBottom:
                          cartItems.length - 1 !== index &&
                          moderateVerticalScale(30),
                        borderBottomWidth:
                          cartItems.length - 1 !== index && moderateScale(0.5),
                        borderColor: BLACK_200,
                        borderStyle: 'dashed',
                      }}
                      key={index}>
                      <View
                        style={[
                          styles.itemContainer,
                          {marginBottom: moderateVerticalScale(20)},
                        ]}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={styles.nameText}>
                          {item.name}
                        </Text>
                        <Image
                          style={styles.image}
                          source={{uri: item.image}}
                        />
                      </View>

                      <View style={styles.itemContainer}>
                        <Text style={styles.priceText}>Rs {item.price}/-</Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          {item.quantity === 1 ? (
                            <TouchableOpacity
                              onPress={() => dispatch(deleteFromCart(item))}
                              style={[styles.removeContainer, {padding: 2}]}>
                              <Icon
                                name={'delete'}
                                color={ORANGE_500}
                                size={14}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => dispatch(decreamentQuantity(item))}
                              style={[styles.removeContainer, {padding: 2}]}>
                              <Icon
                                name={'remove'}
                                color={ORANGE_500}
                                size={14}
                              />
                            </TouchableOpacity>
                          )}
                          <Text style={styles.quantityText}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => dispatch(increamentQuantity(item))}
                            style={[styles.addContainer, {padding: 2}]}>
                            <Icon name={'add'} color={ORANGE_500} size={14} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
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
                  onPress={() => navigation.navigate('Checkout')}
                  style={styles.innerContainer}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                  <FontAwesome
                    name={'angle-double-right'}
                    size={18}
                    color={WHITE}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <LottieView
                source={require('../../utils/animations/notfound.json')}
                autoPlay
                loop
                style={{width: 120, height: 120}}
              />
              <Text style={styles.emptyText}>Your cart is Empty!</Text>
            </View>
          )}
        </>
      ) : (
        <AuthCheck />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  cartItemsContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(0.2),
    borderColor: BLACK_300,
    borderRadius: moderateScale(10),
  },

  image: {
    width: scale(40),
    height: scale(40),
    resizeMode: 'contain',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(20),
  },
  nameText: {
    width: '80%',
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(15),
  },
  priceText: {
    fontFamily: BOLD,
    color: ORANGE_500,
    fontSize: moderateScale(15),
  },

  removeContainer: {
    marginRight: moderateScale(10),
    borderWidth: moderateScale(0.2),
    borderColor: BLACK_300,
    borderRadius: moderateScale(5),
  },

  addContainer: {
    marginLeft: moderateScale(10),
    borderWidth: moderateScale(0.2),
    borderColor: BLACK_300,
    borderRadius: moderateScale(5),
  },

  quantityText: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(14),
    marginBottom: moderateScale(3),
    color: ORANGE_500,
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
  goBack: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: moderateScale(17),
    color: ORANGE_500,
    marginTop: moderateVerticalScale(10),
    fontFamily: MEDIUM,
  },
  heading: {
    fontFamily: BOLD,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: moderateScale(15),
    color: BLACK_LIGHT,
    marginBottom: moderateVerticalScale(10),
  },
});
