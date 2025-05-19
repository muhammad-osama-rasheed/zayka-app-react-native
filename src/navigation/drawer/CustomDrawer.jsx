import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  BLACK_300,
  BLACK_LIGHT,
  ORANGE_400,
  ORANGE_50,
  ORANGE_600,
  WHITE,
} from '../../utils/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {MEDIUM, REGULAR, SEMIBOLD} from '../../utils/font/Font';
import Loader from '../../components/loader/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import useUser from '../../context/features/user/useUser';

const CustomDrawer = ({navigation}) => {
  const {user, token} = useUser();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      navigation.replace('LoginScreen');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Icon name={'account-circle'} size={55} color={ORANGE_600} />

            <View style={styles.topTextContainer}>
              {user && token ? (
                <>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.email}>{user.email}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.name}>Welcome, User!</Text>
                  <Text style={styles.email}>
                    Please login or sign up to continue
                  </Text>
                </>
              )}
            </View>
          </View>

          {user == '' && token == '' && (
            <View style={styles.authContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.authText}>Signup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.authText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.sepreator}></View>

          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              setTimeout(() => {
                navigation.navigate('Favorite');
              }, 450);
            }}
            style={styles.listItemContainer}>
            <Icon name={'favorite'} size={20} color={ORANGE_600} />
            <Text style={styles.listItemText}>Favourites</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              setTimeout(() => {
                navigation.navigate('MyOrders');
              }, 450);
            }}
            style={styles.listItemContainer}>
            <Ionicons name="receipt" size={20} color={ORANGE_600} />
            <Text style={styles.listItemText}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              setTimeout(() => {
                navigation.navigate('Feedback');
              }, 450);
            }}
            style={styles.listItemContainer}>
            <Ionicons
              name={'chatbubble-ellipses'}
              size={20}
              color={ORANGE_600}
            />
            <Text style={styles.listItemText}>Feedbacks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              setTimeout(() => {
                navigation.navigate('AddReview');
              }, 450);
            }}
            style={styles.listItemContainer}>
            <Icon name={'reviews'} size={20} color={ORANGE_600} />
            <Text style={styles.listItemText}>Add Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              setTimeout(() => {
                navigation.navigate('ContactScreen');
              }, 450);
            }}
            style={
              user && token
                ? styles.listItemContainer
                : styles.logoutItemContainer
            }>
            <Ionicons name={'call'} size={20} color={ORANGE_600} />
            <Text style={styles.listItemText}>Contact Us</Text>
          </TouchableOpacity>

          {user && token && token != '' && (
            <TouchableOpacity
              onPress={() => {
                handleLogout();
              }}
              style={styles.logoutItemContainer}>
              <Ionicons name={'log-out'} size={20} color={ORANGE_600} />
              <Text style={styles.listItemText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE_50,
  },

  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: moderateVerticalScale(50),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  topTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: moderateScale(5),
  },
  name: {
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(16),
    color: BLACK_LIGHT,
  },
  email: {
    fontFamily: REGULAR,
    fontSize: moderateScale(10),
  },

  sepreator: {
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(30),
    borderBottomWidth: moderateScale(0.5),
    borderColor: BLACK_300,
    borderStyle: 'dashed',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(25),
    borderBottomWidth: moderateScale(0.3),
    borderColor: ORANGE_400,
    borderStyle: 'dashed',
  },

  logoutItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: moderateVerticalScale(10),
    marginBottom: moderateVerticalScale(25),
  },
  listItemText: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(14),
    marginBottom: moderateVerticalScale(3),
    marginLeft: moderateScale(10),
    color: BLACK_LIGHT,
  },
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(5),
    marginTop: moderateVerticalScale(15),
    marginBottom: moderateVerticalScale(10),
  },
  btn: {
    backgroundColor: ORANGE_600,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    width: scale(120),
  },
  authText: {
    color: WHITE,
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(12),
    color: WHITE,
  },
});
