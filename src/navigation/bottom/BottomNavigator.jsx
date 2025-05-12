import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import {moderateScale, scale} from 'react-native-size-matters';
import Home from '../../screens/home/Home';
import Menu from '../../screens/menu/Menu';
import Search from '../../screens/serach/Search';
import Profile from '../../screens/profile/Profile';
import {useIsFocused} from '@react-navigation/native';
import {BLACK_500, ORANGE_200, ORANGE_500} from '../../utils/colors/Colors';
import {BOLD} from '../../utils/font/Font';

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    activeIcon: 'home',
  },
  {route: 'Menu', label: 'Menu', activeIcon: 'widgets'},
  {
    route: 'Search',
    label: 'Search',
    activeIcon: 'search',
  },
  {
    route: 'Profile',
    label: 'Profile',
    activeIcon: 'person',
  },
];

const screens = {Home, Menu, Search, Profile};

const TabButton = props => {
  const {item, onPress} = props;

  const focused = useIsFocused();

  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const animate1 = {
    0: {scale: 0.5, translateY: 0},
    0.3: {scale: 0.7, translateY: -10},
    0.6: {scale: 1, translateY: -15},
    1: {scale: 1.2, translateY: -18},
  };

  const animate2 = {
    0: {scale: 1.2, translateY: -18},
    0.3: {scale: 1, translateY: -12},
    0.6: {scale: 0.8, translateY: -6},
    1: {scale: 1, translateY: 0},
  };

  const circle1 = {
    0: {scale: 0},
    0.3: {scale: 0.3},
    0.5: {scale: 0.5},
    0.8: {scale: 0.8},
    1: {scale: 1},
    easing: 'ease-in-out',
  };

  const circle2 = {
    0: {scale: 1},
    0.5: {scale: 0.5},
    1: {scale: 0},
    easing: 'ease-in-out',
  };

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1, 800);
      circleRef.current.animate(circle1, 800);
      textRef.current.transitionTo({scale: 1}, 800);
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View style={styles.container} ref={viewRef} duration={1000}>
        <View style={styles.icon}>
          <Animatable.View
            ref={circleRef}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: ORANGE_500,
              borderRadius: moderateScale(25),
            }}
          />
          <Icon
            name={item.activeIcon}
            size={focused ? 16 : 26}
            color={focused ? 'white' : ORANGE_200}
          />
        </View>
        {focused && (
          <Animatable.Text
            ref={textRef}
            style={{
              fontSize: moderateScale(8),
              color: BLACK_500,
              fontFamily: BOLD,
              textAlign: 'center',
            }}>
            {item.label}
          </Animatable.Text>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: '90%',
          marginLeft: '5%',
          height: 50,
          position: 'absolute',
          bottom: 16,
          borderRadius: 100,
          borderColor: 'white',
          elevation: 5,
        },
      }}>
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={screens[item.route]}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(25),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(4),
    borderColor: 'white',
  },
});
