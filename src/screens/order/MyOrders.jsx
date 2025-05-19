import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BLACK_200,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BOLD, MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import BgButton from '../../components/button/bgButton/BgButton';
import Loader from '../../components/loader/Loader';
import LottieView from 'lottie-react-native';
import AuthCheck from '../../components/authCheck/AuthCheck';
import useUser from '../../context/features/user/useUser';

const MyOrders = () => {
  const navigation = useNavigation();
  const focused = useIsFocused();

  const {user, token} = useUser();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState('');

  const getOrders = async () => {
    try {
      setLoading(true);
      const userDataString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userDataString);

      const id = user?._id;

      if (id) {
        const response = await fetch('https://zaykaapi.vercel.app/order', {
          method: 'GET',
        });

        const result = await response.json();
        const {success, data} = result;

        if (success) {
          const filterOrders = data
            .filter(item => item.user._id === id)
            .sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));
          setOrders(filterOrders);
          console.log('orders: ', filterOrders);
        } else {
          setOrders('');
        }
      }
    } catch (error) {
      console.log('Error fetch: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [focused]);

  const formatDate = string => {
    const date = new Date(string);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.orderContainer}>
      <Image
        style={{width: scale(35), height: scale(35), alignSelf: 'center'}}
        resizeMode="contain"
        source={require('../../images/logo.png')}
      />
      <Text style={styles.orderNumber}>Order no: {item._id}</Text>

      <Text style={styles.text}>{formatDate(item.orderedAt)}</Text>

      <Text style={styles.text}>
        Rs <Text style={{fontFamily: SEMIBOLD}}>{item.totalPrice}</Text>/-
      </Text>

      <View style={{marginTop: moderateVerticalScale(20)}}>
        <BgButton
          title={'Track Order'}
          onPress={() =>
            navigation.navigate('OrderTrack', {
              item,
            })
          }
        />

        <BgButton
          title={'Feedback'}
          onPress={() => navigation.navigate('AddReview')}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {user && token && token != '' ? (
        <>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: moderateVerticalScale(50)}}>
              <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
            </TouchableOpacity>

            <View style={{marginTop: moderateVerticalScale(20)}}>
              <Text style={styles.heading}>My Orders</Text>
            </View>
          </View>

          {loading ? (
            ''
          ) : // <Loader />
          orders && orders.length > 0 ? (
            <View style={styles.innerContainer}>
              <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: moderateVerticalScale(15),
                }}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <LottieView
                source={require('../../utils/animations/notfound.json')}
                autoPlay
                loop
                style={{width: 120, height: 120}}
              />
              <Text style={styles.emptyText}>
                You didn't order anything yet!
              </Text>
            </View>
          )}
        </>
      ) : (
        <AuthCheck />
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  goBack: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },

  innerContainer: {
    width: '92%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(100),
  },

  orderContainer: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateVerticalScale(15),
    backgroundColor: WHITE,
    borderRadius: 10,
    borderWidth: moderateScale(0.7),
    borderColor: BLACK_200,
    borderStyle: 'dashed',
    width: '49%',
  },
  orderNumber: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(11),
    color: BLACK_LIGHT,
    marginTop: moderateVerticalScale(15),
  },
  text: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(11),
    color: BLACK_LIGHT,
    marginTop: moderateVerticalScale(5),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: moderateScale(17),
    color: ORANGE_500,
    marginTop: moderateVerticalScale(10),
    fontFamily: MEDIUM,
  },
  heading: {
    fontFamily: BOLD,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: moderateScale(15),
    color: BLACK_LIGHT,
  },
});
