import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useFavorites from '../../context/features/favorites/useFavorites';
import {useIsFocused} from '@react-navigation/native';
import {ORANGE_500, WHITE} from '../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import FavoriteCard from '../../components/cards/favorite/FavoriteCard';
import Loader from '../../components/loader/Loader';
import LottieView from 'lottie-react-native';
import {MEDIUM} from '../../utils/font/Font';
import AuthCheck from '../../components/authCheck/AuthCheck';
import useUser from '../../context/features/user/useUser';

const Favorite = ({navigation}) => {
  const isFocused = useIsFocused();
  const {getFavorites, favoritesList, loading} = useFavorites();

  const {user, token} = useUser();

  useEffect(() => {
    getFavorites();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ORANGE_500} />
      {user && token && token != '' ? (
        <>
          {loading && <Loader />}

          <TouchableOpacity
            style={{
              marginBottom: moderateVerticalScale(10),
              marginLeft: moderateScale(15),
              marginTop: moderateVerticalScale(40),
            }}
            onPress={() => navigation.goBack()}>
            <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
          </TouchableOpacity>

          {favoritesList && favoritesList.length > 0 ? (
            <FlatList
              data={favoritesList && favoritesList}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={{
                    marginBottom:
                      favoritesList.length - 1 === index &&
                      moderateVerticalScale(40),
                  }}>
                  <FavoriteCard item={item} />
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
              <Text style={styles.emptyText}>No favorites found!</Text>
            </View>
          )}
        </>
      ) : (
        <AuthCheck />
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
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
