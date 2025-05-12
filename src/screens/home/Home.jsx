import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  BLACK_400,
  BLACK_500,
  BLACK_LIGHT,
  WHITE,
} from '../../utils/colors/Colors';
import Header from '../../components/header/Header';
import {categories} from '../../utils/data/Data';
import CategoryCard from '../../components/category/card/CategoryCard';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {BOLD} from '../../utils/font/Font';

const Home = () => {
  const [currSelected, setCurrSelected] = useState([0]);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Header />

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
    fontSize: moderateScale(18),
    fontFamily: BOLD,
    color: BLACK_LIGHT,
    letterSpacing: moderateScale(1),
  },
});
