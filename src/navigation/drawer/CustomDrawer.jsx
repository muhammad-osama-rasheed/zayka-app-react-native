import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ORANGE_50} from '../../utils/colors/Colors';

const CustomDrawer = () => {
  return (
    <View style={{flex: 1, backgroundColor: ORANGE_50}}>
      <Text>CustomDrawer</Text>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
