import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
  WHITE_100,
} from '../../utils/colors/Colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {offices} from '../../utils/data/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BOLD, MEDIUM} from '../../utils/font/Font';
import {useNavigation} from '@react-navigation/native';

const ContactScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={ORANGE_500} />

      <ScrollView
        contentContainerStyle={{paddingBottom: moderateVerticalScale(40)}}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginTop: moderateVerticalScale(50)}}>
            <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
          </TouchableOpacity>

          <View style={{marginTop: moderateVerticalScale(20)}}>
            <Text style={styles.heading}>Contact Us</Text>
          </View>
        </View>

        <View style={{marginTop: moderateVerticalScale(20)}}>
          {offices.map((item, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={'phone'} size={16} color={ORANGE_500} />
                <Text style={styles.text}>{item.phone}</Text>
              </View>
              {item.location && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: moderateVerticalScale(2),
                  }}>
                  <Icon name={'location-on'} size={16} color={ORANGE_500} />
                  <Text style={styles.text}>{item.location}</Text>
                </View>
              )}
            </View>
          ))}

          <View style={styles.contactContainer}>
            <Text style={styles.title}>Complaints Email</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name={'mail'} size={16} color={ORANGE_500} />
              <Text
                style={[styles.text, {marginBottom: moderateVerticalScale(4)}]}>
                customercare@zaykapakistan.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_100,
  },
  contactContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: moderateScale(20),
    backgroundColor: WHITE,
    borderRadius: moderateScale(5),
    marginBottom: moderateVerticalScale(20),
  },
  title: {
    fontFamily: BOLD,
    color: BLACK_LIGHT,
    marginBottom: moderateVerticalScale(10),
  },
  text: {
    fontFamily: MEDIUM,
    color: BLACK_LIGHT,
    marginLeft: moderateScale(5),
    width: '95%',
  },
  icon: {
    marginBottom: moderateScale(8),
  },
  heading: {
    fontFamily: BOLD,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: moderateScale(15),
    color: BLACK_LIGHT,
  },
});
