import {View} from 'react-native';
import React from 'react';
import DrawerNavigator from '../navigation/drawer/DrawerNavigator';

const MainDrawer = () => {
  return (
    <View style={{flex: 1}}>
      <DrawerNavigator />
    </View>
  );
};

export default MainDrawer;
