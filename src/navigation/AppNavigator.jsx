import React from 'react';
import {createStackNavigator, Header} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/splash/Splash';
import MainDrawer from '../main/MainDrawer';
import LoginScreen from '../screens/auth/login/LoginScreen';
import SignupScreen from '../screens/auth/signup/SignupScreen';
import VerifyOtp from '../screens/auth/verifyOtp/VerifyOtp';
import ChangePassword from '../screens/auth/changePassword/ChangePassword';
import MainBottom from '../main/MainBottom';
import ProductDetails from '../screens/productDetail/ProductDetails';
import CategoryProducts from '../screens/categoryProducts/CategoryProducts';
import Favorite from '../screens/favorite/Favorite';
import AddReview from '../screens/review/AddReview';
import Feedback from '../screens/review/Feedback';
import Cart from '../screens/cart/Cart';
import Checkout from '../screens/checkout/Checkout';
import MyOrders from '../screens/order/MyOrders';
import OrderTrack from '../screens/track/OrderTrack';
import ContactScreen from '../screens/contact/ContactScreen';

const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MainDrawer"
          component={MainDrawer}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false, presentation: 'modal'}}
        />

        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{headerShown: false, presentation: 'modal'}}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false, presentation: 'modal'}}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CategoryProducts"
          component={CategoryProducts}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="OrderTrack"
          component={OrderTrack}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="AddReview"
          component={AddReview}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />

        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
