import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {
  BLACK_300,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {REGULAR, SEMIBOLD} from '../../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';
import useFavorites from '../../../context/features/favorites/useFavorites';

const FavoriteCard = ({item}) => {
  const navigation = useNavigation();
  const {toggleFavorite} = useFavorites();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {
          item,
        })
      }
      activeOpacity={0.4}
      style={styles.favoritesCardContainer}>
      <View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {item.name}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {item.description}
        </Text>
      </View>
      <Text style={styles.price}>Rs {item.price}/-</Text>
      <TouchableOpacity
        onPress={() => {
          toggleFavorite(item._id);
        }}
        style={styles.icon}>
        <Icon name={'favorite'} size={22} color={ORANGE_500} />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  favoritesCardContainer: {
    width: '80%',
    height: moderateVerticalScale(160),
    alignSelf: 'center',
    elevation: 10,
    shadowColor: BLACK_300,
    backgroundColor: WHITE,
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    position: 'relative',
    padding: moderateScale(15),
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: moderateVerticalScale(20),
  },
  image: {
    position: 'absolute',
    width: scale(100),
    height: scale(100),
    bottom: -30,
    right: -40,
  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  name: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(16),
    width: '80%',
  },
  description: {
    fontFamily: REGULAR,
    color: BLACK_LIGHT,
    fontSize: moderateScale(12),
    width: '80%',
    marginTop: moderateVerticalScale(5),
  },
  price: {
    fontFamily: SEMIBOLD,
    color: ORANGE_500,
    fontSize: moderateScale(16),
    width: '80%',
  },
});
