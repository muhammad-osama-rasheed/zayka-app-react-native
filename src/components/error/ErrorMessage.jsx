import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {MEDIUM} from '../../utils/font/Font';

const ErrorMessage = ({error}) => {
  return (
    <View style={styles.container}>
      <Icon name="error" size={13} color={'#FF3E3E'} style={styles.icon} />
      <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: moderateVerticalScale(5),
    fontSize: moderateScale(12),
    fontFamily: MEDIUM,
    marginBottom: 7,
    marginLeft: 5,
  },
});
