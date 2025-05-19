import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {BLACK_200, ORANGE_500, WHITE} from '../../../utils/colors/Colors';
import {MEDIUM, SEMIBOLD} from '../../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, deleteFromCart} from '../../../redux/slices/CartSlice';
import {showSuccessToast} from '../../../utils/toast/ToastService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useUser from '../../../context/features/user/useUser';

const MenuCard = ({filterCategory, category, setIsVisible}) => {
  const {user, token} = useUser();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const data = filterCategory(category);

  const add = item => {
    dispatch(addToCart(item));
    showSuccessToast(`${item.name} added to cart.`);
  };

  const remove = item => {
    dispatch(deleteFromCart(item));
    showSuccessToast(`${item.name} removed from cart.`);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      key={index}
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          item,
        })
      }>
      <Image style={styles.logo} source={require('../../../images/logo.png')} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>
        {item.name}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Rs {item.price}</Text>
      </View>

      <Image style={styles.image} source={{uri: item.image}} />

      {cartItems.some(product => product._id === item._id) ? (
        <TouchableOpacity
          onPress={() => remove(item)}
          activeOpacity={0.8}
          style={styles.bucketContainer}>
          <Text style={styles.bucketText}>Remove</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            {
              user && token && token != '' ? add(item) : setIsVisible(true);
            }
          }}
          activeOpacity={0.8}
          style={styles.bucketContainer}>
          <Text style={styles.bucketText}>Add to Bucket</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    width: scale(150),
    height: scale(200),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: moderateScale(15),
    paddingTop: moderateVerticalScale(5),
    marginHorizontal: moderateScale(5),
    borderWidth: moderateScale(0.4),
    borderRadius: moderateScale(10),
    borderColor: BLACK_200,
    borderStyle: 'dashed',
    marginBottom: moderateVerticalScale(25),
  },
  logo: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },

  nameText: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(12),
    alignSelf: 'center',
  },

  image: {
    width: scale(75),
    height: scale(75),
    resizeMode: 'contain',
  },
  priceContainer: {
    paddingVertical: moderateVerticalScale(2),
    paddingHorizontal: moderateScale(10),
    backgroundColor: ORANGE_500,
    borderRadius: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: moderateVerticalScale(5),
    marginBottom: moderateVerticalScale(10),
  },
  priceText: {
    fontSize: moderateScale(10),
    color: WHITE,
    fontFamily: MEDIUM,
  },
  bucketContainer: {
    position: 'absolute',
    paddingVertical: moderateVerticalScale(2),
    paddingHorizontal: moderateScale(8),
    right: moderateScale(10),
    bottom: moderateVerticalScale(-10),
    backgroundColor: ORANGE_500,
    borderRadius: 2,
  },

  bucketText: {
    color: WHITE,
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(10),
  },
});
