import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ORANGE_500, WHITE} from '../../../utils/colors/Colors';
import {SEMIBOLD} from '../../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../../context/features/user/useUser';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, deleteFromCart} from '../../../redux/slices/CartSlice';
import {showSuccessToast} from '../../../utils/toast/ToastService';
import AuthCheckModal from '../../authCheck/AuthCheckModal';

const BestSellerCard = ({item}) => {
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);

  const {user, token} = useUser();

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const add = item => {
    dispatch(addToCart(item));
    showSuccessToast(`${item.name} added to cart.`);
  };

  const remove = item => {
    dispatch(deleteFromCart(item));
    showSuccessToast(`${item.name} removed from cart.`);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            item,
          })
        }
        style={styles.container}>
        <View style={styles.cardContainer}>
          {cartItems.some(product => product._id === item._id) ? (
            <TouchableOpacity
              onPress={() => remove(item)}
              style={styles.addView}>
              <Icon name={'remove'} size={24} color={ORANGE_500} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                {
                  user && token && token != '' ? add(item) : setIsVisible(true);
                }
              }}
              style={styles.addView}>
              <Icon name={'add'} size={24} color={ORANGE_500} />
            </TouchableOpacity>
          )}

          <View style={styles.cardTop}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{uri: item.image}}
            resizeMethod="contain"
          />
          <View style={styles.cardBottom}>
            <Text style={styles.price}>Rs {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <AuthCheckModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};

export default BestSellerCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'rgba(251, 174, 60, 0.07)',
    borderRadius: moderateScale(20),
    width: '100%',
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateVerticalScale(10),
  },
  image: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginVertical: moderateVerticalScale(20),
    resizeMode: 'contain',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
  },
  name: {
    flex: 1,
    fontFamily: SEMIBOLD,
    color: ORANGE_500,
  },
  cardBottom: {paddingHorizontal: moderateScale(5)},
  price: {
    flex: 1,
    fontFamily: 'Quicksand-Bold',
    color: ORANGE_500,
    fontSize: moderateScale(13),
  },
  addView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: scale(40),
    height: scale(40),
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: moderateScale(16),
    borderBottomEndRadius: moderateScale(16),
    zIndex: 1,
  },
});
