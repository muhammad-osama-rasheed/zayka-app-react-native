import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BLACK_200,
  BLACK_300,
  BLACK_500,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {MEDIUM} from '../../utils/font/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showErrorToast, showSuccessToast} from '../../utils/toast/ToastService';
import Loader from '../../components/loader/Loader';
import LottieView from 'lottie-react-native';

const Feedback = ({navigation}) => {
  const [reviews, setReviews] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const focused = useIsFocused();

  const getReviews = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('user');
    const parseUserData = JSON.parse(userData);

    if (parseUserData) {
      setId(parseUserData._id);
    }

    try {
      const response = await fetch('https://zaykaapi.vercel.app/reviews', {
        method: 'GET',
      });

      const result = await response.json();
      const {success, data} = result;

      if (success) {
        setReviews(data);
      } else {
        setReviews('');
      }
    } catch (error) {
      console.log('Error feching: ', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async reviewId => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://zaykaapi.vercel.app/reviews/${reviewId}`,
        {
          method: 'DELETE',
        },
      );

      const result = await response.json();
      const {success, message} = result;

      if (success) {
        getReviews();
        showSuccessToast(message);
      } else {
        showErrorToast(message);
      }
    } catch (error) {
      showErrorToast('Failed to delete a review.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [focused]);

  const renderStars = count => {
    return [...Array(count)].map((_, i) => (
      <Icon key={i} name="star" size={18} color={ORANGE_500} />
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ORANGE_500} />

      <TouchableOpacity
        style={{
          marginBottom: moderateVerticalScale(10),
          marginLeft: moderateScale(15),
          marginTop: moderateVerticalScale(40),
        }}
        onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
      </TouchableOpacity>

      {loading ? (
        <Loader />
      ) : reviews && reviews.length > 0 ? (
        <FlatList
          data={reviews}
          renderItem={({item, index}) => (
            <View style={styles.reviewContainer} key={index}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'account-circle'} size={28} color={ORANGE_500} />
                <Text style={styles.nameText}>{item.user.name}</Text>
              </View>
              {id && id === item.user._id && (
                <TouchableOpacity
                  onPress={() => deleteReview(item._id)}
                  style={styles.binContainer}>
                  <Icon name="delete" size={20} color={ORANGE_500} />
                </TouchableOpacity>
              )}

              <View
                style={{
                  marginVertical: moderateVerticalScale(10),
                }}>
                <Text style={styles.reviewText}>{item.review}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                {renderStars(item.rating || 5)}
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require('../../utils/animations/notfound.json')}
            autoPlay
            loop
            style={{width: 120, height: 120}}
          />
          <Text style={styles.emptyText}>No Reviews found!</Text>
        </View>
      )}
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  reviewContainer: {
    width: '90%',
    // height: moderateVerticalScale(120),
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
  nameText: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(5),
  },

  reviewText: {
    fontFamily: MEDIUM,
    color: BLACK_500,
    fontSize: moderateScale(12),
    marginLeft: moderateScale(5),
  },
  binContainer: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScale(10),
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
});
