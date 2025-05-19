import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {BLACK_LIGHT, ORANGE_500, WHITE} from '../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BOLD, MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import useFavorites from '../../context/features/favorites/useFavorites';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, deleteFromCart} from '../../redux/slices/CartSlice';
import {showSuccessToast} from '../../utils/toast/ToastService';
import Bucket from '../../components/bucket/Bucket';
import useUser from '../../context/features/user/useUser';
import AuthCheckModal from '../../components/authCheck/AuthCheckModal';

const ProductDetails = ({navigation}) => {
  const route = useRoute();
  const {name, image, category, description, price, available, _id} =
    route.params.item;

  const focused = useIsFocused();

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const {
    toggleFavorite,
    favoritesList,
    getFavorites,
    isFavorite,
    setIsFavorite,
  } = useFavorites();

  const {user, token} = useUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getFavorites();
  }, [focused]);

  const handleToggleFavorite = () => {
    toggleFavorite(_id);
  };

  useEffect(() => {
    const isFav = favoritesList?.some(item => item._id === _id);
    setIsFavorite(isFav);
  }, [favoritesList]);

  const add = item => {
    dispatch(addToCart(item));
    showSuccessToast(`${item.name} added to cart.`, 'Added');
  };

  const remove = item => {
    dispatch(deleteFromCart(item));
    showSuccessToast(`${item.name} removed from cart.`, 'Removed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} barStyle={'dark-content'} />

      {cartItems.some(item => item._id === _id) && (
        <Bucket count={cartItems.length} />
      )}

      {/* {cartItems && cartItems.length > 0 && <Bucket count={cartItems.length} />} */}

      <ScrollView>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={ORANGE_500} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              {
                user && token ? handleToggleFavorite() : setIsVisible(true);
              }
            }}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={22}
              color={ORANGE_500}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentSectionContainer}>
          <View>
            <Text style={styles.nametext}>{name && name}</Text>
            <Text style={styles.categorytext}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>

            <Text style={styles.pricetext}>Rs {price && price}/-</Text>

            <Text style={styles.availabletext}>
              {available ? 'Available' : 'Not Avialable'}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: image}} />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionheadingContainer}>
            <View style={styles.left}></View>
            <Text style={styles.descriptionheading}>Description</Text>
            <View style={styles.right}></View>
          </View>

          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </ScrollView>

      {cartItems.some(product => product._id === _id) ? (
        <TouchableOpacity
          onPress={() => remove(route.params.item)}
          activeOpacity={0.7}
          style={styles.placeOrderContainer}>
          <Text style={styles.placeOrderText}>Remove from Bucket</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            {
              user && token ? add(route.params.item) : setIsVisible(true);
            }
          }}
          activeOpacity={0.7}
          style={styles.placeOrderContainer}>
          <Text style={styles.placeOrderText}>Add to Bucket</Text>
        </TouchableOpacity>
      )}

      <AuthCheckModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  topHeader: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },

  contentSectionContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  nametext: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(18),
    width: scale(160),
  },

  categorytext: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    fontSize: moderateScale(14),
    width: scale(150),
    marginBottom: moderateVerticalScale(60),
    color: ORANGE_500,
  },

  availabletext: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(14),
    width: scale(160),
    marginBottom: moderateVerticalScale(60),
  },

  pricetext: {
    fontFamily: BOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(18),
    width: scale(150),
    marginBottom: moderateVerticalScale(60),
    color: ORANGE_500,
  },

  imageContainer: {
    width: scale(220),
    height: scale(220),
    marginBottom: moderateVerticalScale(50),
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeOrderContainer: {
    position: 'absolute',
    bottom: 0,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: ORANGE_500,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },

  placeOrderText: {
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(15),
    color: WHITE,
  },

  descriptionContainer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: moderateVerticalScale(150),
  },
  descriptionText: {
    fontFamily: MEDIUM,
    textAlign: 'center',
  },

  descriptionheadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateVerticalScale(20),
  },

  left: {
    width: scale(20),
    height: scale(1),
    backgroundColor: ORANGE_500,
    marginRight: moderateScale(8),
    marginTop: moderateScale(2),
  },

  right: {
    width: scale(20),
    height: scale(1),
    backgroundColor: ORANGE_500,
    marginLeft: moderateScale(8),
    marginTop: moderateScale(2),
  },

  descriptionheading: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
  },
});
