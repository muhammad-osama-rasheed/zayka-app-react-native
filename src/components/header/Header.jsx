import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BLACK_300, ORANGE_500, WHITE} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
const Header = () => {
  const navigation = useNavigation();

  const cartItems = useSelector(state => state.cart);

  return (
    <View style={styles.topContainer}>
      <View style={styles.topIconsContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.leftIconsContainer}>
          <Image
            style={styles.burger}
            source={require('../../images/burger.png')}
          />
        </TouchableOpacity>
        <View style={styles.rightIconsContainer}>
          {cartItems.length > 0 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.cartContainer}>
              <LottieView
                source={require('../../utils/animations/cart.json')}
                autoPlay
                loop
                style={{width: 32, height: 32}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Icon name={'shopping-cart'} color={WHITE} size={18} />
            </TouchableOpacity>
          )}

          <Icon name={'notifications'} color={WHITE} size={18} />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Search', {autoFocus: true})}
        style={styles.searchBar}>
        <Icon name={'search'} size={20} color={ORANGE_500} />
        <TextInput
          editable={false}
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor={BLACK_300}
          cursorColor={ORANGE_500}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: verticalScale(110),
    backgroundColor: ORANGE_500,
    borderBottomLeftRadius: moderateScale(40),
    borderBottomEndRadius: moderateScale(40),
    justifyContent: 'center',
  },

  topIconsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },

  rightIconsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  leftIconsContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  nameText: {
    color: WHITE,
    fontFamily: 'Quicksand-SemiBold',
    fontSize: moderateScale(14),
    marginBottom: moderateVerticalScale(3),
  },

  searchBar: {
    width: '80%',
    height: verticalScale(42),
    backgroundColor: WHITE,
    elevation: 5,
    borderRadius: moderateScale(10),
    position: 'absolute',
    bottom: moderateVerticalScale(-18),
    left: '10%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    color: '#000000B3',
    fontFamily: 'Quicksand-Regular',
  },
  burger: {
    width: scale(20),
    height: scale(20),
  },
});
