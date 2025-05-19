import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BLACK_400, WHITE} from '../../utils/colors/Colors';
import Header from '../../components/header/Header';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {SEMIBOLD} from '../../utils/font/Font';
import MenuCard from '../../components/cards/menu/MenuCard';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Bucket from '../../components/bucket/Bucket';
import AuthCheckModal from '../../components/authCheck/AuthCheckModal';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const focused = useIsFocused();

  const cartItems = useSelector(state => state.cart);
  console.log('Cart Items: ', cartItems);

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

  const filterCategory = category => {
    return products.filter(item => item.category === category);
  };

  return (
    <View style={styles.container}>
      {cartItems && cartItems.length > 0 && <Bucket count={cartItems.length} />}

      <Header />

      <FlatList
        data={[1, 1, 1, 1, 1]}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                marginBottom:
                  index === [1, 1, 1, 1, 1].length - 1
                    ? moderateVerticalScale(150)
                    : '',
              }}>
              {index === 0 && (
                <>
                  {filterCategory('burger').length > 0 && (
                    <View
                      style={[
                        styles.sectionContainer,
                        {marginTop: moderateVerticalScale(50)},
                      ]}>
                      <Text style={styles.categoryName}>
                        Burger <Text style={styles.icon}>🍔</Text>
                      </Text>

                      <MenuCard
                        category={'burger'}
                        filterCategory={filterCategory}
                        setIsVisible={setIsVisible}
                      />
                    </View>
                  )}
                </>
              )}

              {index === 1 && (
                <>
                  {filterCategory('pizza').length > 0 && (
                    <View style={styles.sectionContainer}>
                      <Text style={styles.categoryName}>
                        Pizza <Text style={styles.icon}>🍕</Text>
                      </Text>

                      <MenuCard
                        category={'pizza'}
                        filterCategory={filterCategory}
                        setIsVisible={setIsVisible}
                      />
                    </View>
                  )}
                </>
              )}

              {index === 2 && (
                <>
                  {filterCategory('seafood').length > 0 && (
                    <View style={styles.sectionContainer}>
                      <Text style={styles.categoryName}>
                        Sea Food <Text style={styles.icon}>🍤</Text>
                      </Text>

                      <MenuCard
                        category={'seafood'}
                        filterCategory={filterCategory}
                        setIsVisible={setIsVisible}
                      />
                    </View>
                  )}
                </>
              )}

              {index === 3 && (
                <>
                  {filterCategory('sweet').length > 0 && (
                    <View style={styles.sectionContainer}>
                      <Text style={styles.categoryName}>
                        Sweets <Text style={styles.icon}>🍩</Text>
                      </Text>

                      <MenuCard
                        category={'sweet'}
                        filterCategory={filterCategory}
                        setIsVisible={setIsVisible}
                      />
                    </View>
                  )}
                </>
              )}

              {index === 4 && (
                <>
                  {filterCategory('drink').length > 0 && (
                    <View style={[styles.sectionContainer]}>
                      <Text style={styles.categoryName}>
                        Drinks <Text style={styles.icon}>🍹</Text>
                      </Text>

                      <MenuCard
                        category={'drink'}
                        filterCategory={filterCategory}
                        setIsVisible={setIsVisible}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          );
        }}
      />

      <AuthCheckModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  sectionContainer: {
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
  },

  categoryName: {
    textAlign: 'center',
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(15),
    color: BLACK_400,
    marginBottom: moderateVerticalScale(20),
  },

  icon: {
    fontSize: moderateScale(14),
  },
});
