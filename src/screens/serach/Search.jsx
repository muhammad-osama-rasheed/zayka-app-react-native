import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BLACK_100,
  BLACK_300,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {MEDIUM} from '../../utils/font/Font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {quickSearches} from '../../utils/data/Data';

const Search = () => {
  const route = useRoute();
  const autoFocusFromParam = route?.params?.autoFocus || false;

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [search, setSearch] = useState('');
  const [products, setProducts] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused && autoFocusFromParam && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused, autoFocusFromParam]);

  const searchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://zaykaapi.vercel.app/product/search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            search,
          }),
        },
      );

      const result = await response.json();

      const {success, message, data} = result;

      if (success) {
        setProducts(data);
      } else {
        setProducts('');
      }
    } catch (error) {
      console.log('Error fetching: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search == '') {
      setProducts([]);
      return;
    }

    searchProduct();
  }, [search]);

  useEffect(() => {
    if (!isFocused) {
      setSearch('');
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topIconsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'arrow-back'} color={WHITE} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Icon name={'search'} size={20} color={ORANGE_500} />
          <TextInput
            ref={inputRef}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholder="Hungry? Find something tasty..."
            placeholderTextColor={BLACK_300}
            cursorColor={ORANGE_500}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={ORANGE_500} />
        </View>
      ) : search && products && products.length > 0 ? (
        <View style={styles.searchProductContainer}>
          <Text style={styles.relevantHeading}>Relevant Searches</Text>

          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate('ProductDetails', {
                      item,
                    });
                    setSearch('');
                  }}
                  style={[
                    styles.productContainer,
                    {
                      borderBottomWidth:
                        products.length - 1 === index ? 0 : moderateScale(0.5),
                    },
                  ]}>
                  <Icon name={'arrow-right'} size={16} color={ORANGE_500} />
                  <Image
                    style={styles.searchImage}
                    source={{uri: item.image}}
                  />
                  <Text style={styles.productNameText}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : search != '' && products == '' ? (
        <View style={styles.notFoundContainer}>
          <MaterialCommunityIcons
            style={{
              marginRight: moderateScale(5),
              marginTop: moderateVerticalScale(2),
            }}
            name={'emoticon-sad-outline'}
            size={16}
            color={ORANGE_500}
          />
          <Text style={{fontFamily: MEDIUM, color: BLACK_LIGHT}}>
            "{search}" not found!
          </Text>
        </View>
      ) : (
        <View style={styles.searchProductContainer}>
          <Text style={styles.relevantHeading}>Quick Search</Text>

          <FlatList
            data={quickSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setSearch(item.name);
                  }}
                  style={[
                    styles.productContainer,
                    {
                      borderBottomWidth:
                        quickSearches.length - 1 === index
                          ? 0
                          : moderateScale(0.5),
                    },
                  ]}>
                  <MaterialCommunityIcons
                    style={styles.quickIcon}
                    name={item.icon}
                    size={18}
                    color={ORANGE_500}
                  />

                  <Text style={styles.productNameText}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

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

  searchProductContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: moderateVerticalScale(40),
  },

  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(20),
    borderBottomColor: BLACK_100,
    borderBottomWidth: moderateScale(0.5),
    borderStyle: 'dashed',
  },

  searchImage: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    marginLeft: moderateScale(5),
  },

  productNameText: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    marginLeft: moderateScale(8),
    fontSize: moderateScale(13),
  },

  relevantHeading: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: moderateVerticalScale(15),
    fontFamily: MEDIUM,
    fontSize: moderateScale(14),
  },

  quickIcon: {
    paddingHorizontal: moderateScale(5),
  },

  notFoundContainer: {
    flex: 1,
    paddingVertical: moderateVerticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(40),
  },
});
