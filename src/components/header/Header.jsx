import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {BLACK_300, ORANGE_500, WHITE} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.topContainer}>
      <View style={styles.topIconsContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.leftIconsContainer}>
          <Image
            style={styles.burger}
            source={require('../../images/burger.png')}
          />
          {/* <Icon name={'account-circle'} color={WHITE} size={18} /> */}
          {/* <Text style={styles.nameText}>Osama</Text> */}
        </TouchableOpacity>
        <View style={styles.rightIconsContainer}>
          <Icon name={'shopping-cart'} color={WHITE} size={18} />
          <Icon name={'notifications'} color={WHITE} size={18} />
        </View>
      </View>
      <View style={styles.searchBar}>
        <Icon name={'search'} size={20} color={ORANGE_500} />
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor={BLACK_300}
          cursorColor={ORANGE_500}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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

  rightIconsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  leftIconsContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  nameText: {
    color: WHITE,
    fontFamily: 'Quicksand-SemiBold',
    fontSize: moderateScale(14),
    marginBottom: moderateVerticalScale(3),
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
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    color: '#000000B3',
    fontFamily: 'Quicksand-Regular',
  },
  burger: {
    width: scale(20),
    height: scale(20),
  },
});
