import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import {BLACK_LIGHT, ORANGE_500, WHITE} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import CustomInput from '../../components/input/CustomInput';
import {MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ErrorMessage from '../../components/error/ErrorMessage';
import BgButton from '../../components/button/bgButton/BgButton';
import {showErrorToast, showSuccessToast} from '../../utils/toast/ToastService';
import Loader from '../../components/loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import useUser from '../../context/features/user/useUser';
import AuthCheck from '../../components/authCheck/AuthCheck';

const AddReview = ({navigation}) => {
  const {user, token} = useUser();

  const [ratingValue, setRatingValue] = useState(0);
  const [review, setReview] = useState('');
  const [badReview, setBadReview] = useState('');

  const focused = useIsFocused();

  const [id, setId] = useState('');

  const [loading, setLoading] = useState(false);

  const handleRating = rating => {
    setRatingValue(rating);
  };

  const validateReview = () => {
    let validRating = true;
    let validReview = true;

    if (ratingValue === 0) {
      Alert.alert('Error', 'Please give a rating.');
      validRating = false;
    }

    if (review.trim() === '') {
      setBadReview('Please write your review.');
      validReview = false;
    } else {
      setBadReview('');
    }

    return validRating && validReview;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://zaykaapi.vercel.app/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          user: id,
          rating: ratingValue,
          review,
        }),
      });

      const result = await response.json();
      const {success, message} = result;

      if (success) {
        showSuccessToast(message);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      } else {
        showErrorToast(message);
      }
    } catch (error) {
      showErrorToast('Failed to add Review.');
      console.log(error);
    } finally {
      setLoading(false);
      stateEmpty();
    }
  };

  const stateEmpty = () => {
    setReview('');
    setRatingValue('');
    setBadReview('');
  };

  const fetchLocalData = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);

    if (user) {
      setId(user._id);
    }
  };

  useEffect(() => {
    fetchLocalData();
  }, [focused]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {user && token && token != '' ? (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />

          {loading && <Loader />}
          <Image
            style={{
              height: scale(130),
              width: scale(130),
              position: 'absolute',
              right: 0,
              top: 0,
            }}
            resizeMode="contain"
            source={require('../../images/3.png')}
          />
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                stateEmpty();
              }}
              style={styles.backButton}>
              <Icon name={'arrow-back'} color={ORANGE_500} size={24} />
            </TouchableOpacity>

            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Give Your Feedback</Text>
              <Text style={styles.text}>
                We would love to hear your thoughts and experiences.
              </Text>
            </View>

            <Rating
              showRating
              onFinishRating={handleRating}
              style={{paddingVertical: 10}}
              minValue={0}
              startingValue={0}
              ratingCount={5}
            />

            <View
              style={{
                marginTop: moderateVerticalScale(40),
                marginBottom: moderateVerticalScale(20),
              }}>
              <CustomInput
                value={review}
                onChangeText={setReview}
                label={'Your Review'}
                placeholder={'Write your experience...'}
                icon={'message'}
                bad={badReview != ''}
              />
              {badReview && <ErrorMessage error={badReview} />}
            </View>

            <BgButton
              title={'Post Review'}
              onPress={() => {
                if (validateReview()) {
                  handleSubmit();
                }
              }}
            />
          </View>

          <Image
            style={{
              height: scale(130),
              width: scale(130),
              marginTop: moderateVerticalScale(70),
            }}
            resizeMode="contain"
            source={require('../../images/4.png')}
          />
        </ScrollView>
      ) : (
        <AuthCheck />
      )}
    </TouchableWithoutFeedback>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  ratingContainer: {
    marginTop: moderateVerticalScale(40),
    width: '90%',
    alignSelf: 'center',
    paddingBottom: moderateVerticalScale(30),
  },
  heading: {
    fontFamily: SEMIBOLD,
    color: BLACK_LIGHT,
    fontSize: moderateScale(20),
    marginBottom: moderateVerticalScale(8),
  },
  text: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    fontSize: moderateScale(14),
    width: '80%',
  },
  headingContainer: {
    paddingVertical: moderateVerticalScale(20),
  },
});
