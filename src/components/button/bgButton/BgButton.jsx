import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {WHITE} from '../../../utils/colors/Colors';

const BgButton = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.btnContainer}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BgButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FBAE3C',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    color: WHITE,
  },
});
