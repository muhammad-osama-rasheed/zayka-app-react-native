import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainBottom from '../../main/MainBottom';
import CustomDrawer from './CustomDrawer';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="MainBottom"
        component={MainBottom}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
