import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  BLACK,
  BLACK_600,
  ORANGE_300,
  ORANGE_500,
  WHITE,
} from '../../../utils/colors/Colors';
import {SEMIBOLD} from '../../../utils/font/Font';

const CategoryCard = ({item, index, currSelected, setCurrSelected}) => {
  return (
    <TouchableOpacity
      onPress={() => setCurrSelected(index)}
      activeOpacity={0.9}>
      <View
        style={[
          styles.categoryContainer,
          {
            backgroundColor: currSelected == index ? ORANGE_300 : WHITE,
          },
        ]}>
        <View style={{width: scale(45), height: verticalScale(45)}}>
          <Image
            source={item.image}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <Text style={styles.categoryItemText}>{item.title}</Text>
        <View
          style={[
            styles.categoryIconContainer,
            {
              backgroundColor: currSelected == index ? WHITE : ORANGE_500,
            },
          ]}>
          <Icon
            name={'chevron-right'}
            size={18}
            color={currSelected == index ? BLACK : WHITE}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryContainer: {
    width: scale(120),
    height: moderateVerticalScale(180),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
    elevation: 20,
    shadowColor: '#bbb',
  },
  categoryItemText: {
    fontSize: moderateScale(15),
    fontFamily: SEMIBOLD,
    color: BLACK_600,
  },
  categoryIconContainer: {
    width: scale(30),
    height: scale(30),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
