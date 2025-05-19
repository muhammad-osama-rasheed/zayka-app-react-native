import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale} from 'react-native-size-matters';
import {ORANGE_500, WHITE} from '../../utils/colors/Colors';
import {BOLD} from '../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';

const Bucket = ({count}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.bucketContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigation.navigate('Cart')}
        activeOpacity={0.8}>
        <View style={styles.countContainer}>
          <Text
            style={[
              styles.countText,
              {
                fontSize: count > 98 ? moderateScale(10) : moderateScale(13),
              },
            ]}>
            {count < 99 ? count : `99+`}
          </Text>
        </View>

        <Image style={styles.image} source={require('../../images/bu.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default Bucket;

const styles = StyleSheet.create({
  bucketContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 999,
    elevation: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
  },
  countContainer: {
    backgroundColor: ORANGE_500,
    position: 'absolute',
    width: scale(20),
    height: scale(20),
    top: 34,
    left: 22,
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  countText: {
    fontFamily: BOLD,
    color: WHITE,
  },
});
