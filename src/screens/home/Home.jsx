import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BLACK_LIGHT, WHITE} from '../../utils/colors/Colors';
import Header from '../../components/header/Header';
import {categories} from '../../utils/data/Data';
import CategoryCard from '../../components/category/card/CategoryCard';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {BOLD, SEMIBOLD} from '../../utils/font/Font';
import HomeProductCard from '../../components/category/productCard/HomeProductCard';
import BestSellerCard from '../../components/cards/bestSeller/BestSellerCard';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Bucket from '../../components/bucket/Bucket';
import useUser from '../../context/features/user/useUser';

const Home = ({navigation}) => {
  const [currSelected, setCurrSelected] = useState(0);

  const {user, token} = useUser();
  console.log(user);
  console.log('token', token);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const cartItems = useSelector(state => state.cart);

  const focused = useIsFocused();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zaykaapi.vercel.app/product', {
        method: 'GET',
      });

      const result = await response.json();
      const {success, message, data} = result;

      if (success) {
        setProducts(data);
        // console.log('Data:', data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [focused]);

  const categoryMap = ['pizza', 'burger', 'seafood', 'sweet', 'drink'];

  const filteredProducts = products.filter(
    item => item.category === categoryMap[currSelected],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />

      {cartItems && cartItems.length > 0 && <Bucket count={cartItems.length} />}

      <Header />

      <FlatList
        data={[1, 1, 1]}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              {index === 0 && (
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>Categories</Text>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({item, index}) => (
                      <CategoryCard
                        item={item}
                        index={index}
                        currSelected={currSelected}
                        setCurrSelected={setCurrSelected}
                      />
                    )}
                  />
                </View>
              )}

              {index === 1 && (
                <View style={styles.categoryProductContainer}>
                  <Text style={styles.categoryProductText}>
                    {categoryMap[currSelected] &&
                      categoryMap[currSelected].charAt(0).toUpperCase() +
                        categoryMap[currSelected].slice(1)}
                  </Text>
                  <HomeProductCard filteredProducts={filteredProducts} />
                </View>
              )}

              {index === 2 && (
                <View style={styles.bestSellersContainer}>
                  <Text style={styles.bestSellerHeadingText}>
                    Tasty Picks for You
                  </Text>
                  <FlatList
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={products.slice(0, 6)}
                    contentContainerStyle={{
                      paddingBottom: 700,
                    }}
                    columnWrapperStyle={{
                      gap: 8,
                      marginBottom: moderateVerticalScale(16),
                    }}
                    renderItem={({item, index}) => (
                      <BestSellerCard item={item} />
                    )}
                  />
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  categoryContainer: {
    marginTop: moderateVerticalScale(50),
  },

  categoryText: {
    width: '90%',
    alignSelf: 'center',
    fontSize: moderateScale(17),
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    letterSpacing: moderateScale(1),
  },

  categoryProductContainer: {
    marginTop: moderateVerticalScale(10),
  },

  categoryProductText: {
    width: '90%',
    alignSelf: 'center',
    fontSize: moderateScale(17),
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    letterSpacing: moderateScale(1),
    marginBottom: moderateVerticalScale(15),
  },
  bestSellersContainer: {
    marginTop: moderateVerticalScale(30),
    width: '90%',
    alignSelf: 'center',
    marginBottom: moderateVerticalScale(160),
  },

  bestSellerHeadingText: {
    fontSize: moderateScale(16),
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    letterSpacing: moderateScale(1),
    marginBottom: moderateVerticalScale(15),
  },
});
