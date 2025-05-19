import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {moderateScale, scale} from 'react-native-size-matters';
import {BLACK_200, ORANGE_500, WHITE} from '../../../utils/colors/Colors';
import {MEDIUM} from '../../../utils/font/Font';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const HomeProductCard = ({filteredProducts}) => {
  const navigation = useNavigation();

  const allData = filteredProducts;
  const data = filteredProducts.slice(0, 2);

  const products = data.length > 0 && [...data, {seeMore: true}];

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <>
            {!item.seeMore ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    item,
                  })
                }
                activeOpacity={0.5}
                key={index}
                style={styles.card}>
                <Image
                  style={styles.logo}
                  source={require('../../../images/logo.png')}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.nameText}>
                  {item.name}
                </Text>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>Rs {item.price}</Text>
                </View>

                <Image style={styles.image} source={{uri: item.image}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CategoryProducts', {
                    item: allData,
                  })
                }
                activeOpacity={0.5}
                key={index}
                style={styles.seeMoreCard}>
                <View style={styles.seeMoreIconContainer}>
                  <Icon name="more-horiz" size={22} color={WHITE} />
                </View>
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      />
    </View>
  );
};

export default HomeProductCard;

const styles = StyleSheet.create({
  container: {
    width: '96%',
    alignSelf: 'center',
  },
  card: {
    width: scale(130),
    height: scale(180),
    padding: moderateScale(15),
    marginHorizontal: moderateScale(5),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.4,
    borderRadius: moderateScale(10),
    borderColor: BLACK_200,
    borderStyle: 'dashed',
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
    width: scale(65),
    height: scale(65),
    resizeMode: 'contain',
  },
  priceContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: ORANGE_500,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 10,
    color: WHITE,
    fontFamily: MEDIUM,
  },
  seeMoreCard: {
    width: scale(130),
    height: scale(180),
    padding: moderateScale(15),
    marginHorizontal: moderateScale(5),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderRadius: moderateScale(10),
    borderColor: BLACK_200,
    borderStyle: 'dashed',
  },
  seeMoreText: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(12),
  },
  seeMoreIconContainer: {
    borderRadius: 25,
    backgroundColor: ORANGE_500,
    marginBottom: 8,
  },
});
