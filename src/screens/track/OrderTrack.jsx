import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BLACK_200,
  BLACK_400,
  BLACK_LIGHT,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {BOLD, MEDIUM, SEMIBOLD} from '../../utils/font/Font';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';

const OrderTrack = () => {
  const route = useRoute();
  const {item} = route.params;

  const navigation = useNavigation();

  const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = STATUS_STEPS.indexOf(item.status);

  const getLottieSource = () => {
    switch (item.status) {
      case 'Pending':
        return require('../../utils/animations/loading.json');
      case 'Processing':
        return require('../../utils/animations/processing.json');
      case 'Shipped':
        return require('../../utils/animations/shipped.json');
      case 'Delivered':
        return require('../../utils/animations/delivered.json');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name={'arrow-back'} size={22} color={ORANGE_500} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{paddingBottom: moderateVerticalScale(50)}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Track Order Progress</Text>
          <Text style={styles.numText}>Order Number:</Text>
          <Text style={styles.numText}>{item._id}</Text>
        </View>

        <View style={styles.trackingContainer}>
          <View style={styles.stepsContainer}>
            {STATUS_STEPS.map((step, index) => (
              <View
                key={index}
                style={index <= currentStep ? styles.bgStep : styles.step}
              />
            ))}
          </View>

          <Text style={styles.stepText}>{`Step ${currentStep + 1}`}</Text>

          <View style={styles.lottie}>
            {getLottieSource() && (
              <LottieView
                source={getLottieSource()}
                autoPlay
                loop
                style={{width: 120, height: 120}}
              />
            )}
          </View>

          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderTrack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headingContainer: {
    marginTop: moderateVerticalScale(20),
    width: '90%',
    alignSelf: 'center',
  },
  headingText: {
    fontFamily: SEMIBOLD,
    fontSize: moderateScale(18),
    color: BLACK_LIGHT,
    marginBottom: moderateVerticalScale(10),
  },
  numText: {
    fontFamily: MEDIUM,
    fontSize: moderateScale(12),
    color: BLACK_LIGHT,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(6),
  },
  step: {
    height: verticalScale(7),
    borderWidth: moderateScale(0.5),
    width: '20%',
    borderColor: BLACK_400,
    borderRadius: moderateScale(2),
    borderStyle: 'dashed',
  },
  bgStep: {
    height: verticalScale(7),
    width: '20%',
    backgroundColor: ORANGE_500,
    borderRadius: moderateScale(2),
  },
  stepText: {
    textAlign: 'center',
    fontFamily: BOLD,
    marginTop: moderateVerticalScale(30),
    fontSize: moderateScale(18),
    color: ORANGE_500,
    textTransform: 'uppercase',
    letterSpacing: moderateScale(1),
  },
  statusText: {
    textAlign: 'center',
    fontFamily: BOLD,
    color: ORANGE_500,
    fontSize: moderateScale(18),
    textTransform: 'uppercase',
    letterSpacing: moderateScale(2),
  },
  lottie: {
    alignSelf: 'center',
    marginVertical: moderateVerticalScale(30),
  },
  goBack: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
  trackingContainer: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.7,
    borderStyle: 'dashed',
    paddingVertical: moderateScale(40),
    marginTop: moderateVerticalScale(50),
    borderRadius: moderateScale(10),
    borderColor: BLACK_200,
  },
});
