import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BLACK,
  BLACK_LIGHT,
  ORANGE_300,
  ORANGE_500,
  WHITE,
} from '../../utils/colors/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BOLD, REGULAR} from '../../utils/font/Font';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useUser from '../../context/features/user/useUser';
import {useDispatch, useSelector} from 'react-redux';
import {showSuccessToast} from '../../utils/toast/ToastService';
import {addToCart, deleteFromCart} from '../../redux/slices/CartSlice';
import AuthCheckModal from '../../components/authCheck/AuthCheckModal';

const CategoryProducts = () => {
  const route = useRoute();
  const data = route.params.item;

  const [isVisible, setIsVisible] = useState(false);

  const {user, token} = useUser();

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const navigation = useNavigation();

  const add = item => {
    dispatch(addToCart(item));
    showSuccessToast(`${item.name} added to cart.`);
  };

  const remove = item => {
    dispatch(deleteFromCart(item));
    showSuccessToast(`${item.name} removed from cart.`);
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
      <View style={{marginTop: moderateVerticalScale(40)}}></View>
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                item,
              })
            }
            activeOpacity={0.8}
            style={styles.itemContainer}>
            <View style={{marginBottom: moderateVerticalScale(50)}}>
              {item.topWeek ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5 name="crown" size={10} color={ORANGE_300} />
                  <Text
                    style={{
                      fontFamily: REGULAR,
                      marginLeft: moderateScale(5),
                      fontSize: moderateScale(12),
                    }}>
                    Top of the week
                  </Text>
                </View>
              ) : item.available ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    style={{marginTop: moderateVerticalScale(2)}}
                    name="check-circle"
                    size={11}
                    color={ORANGE_300}
                  />
                  <Text
                    style={{
                      fontFamily: REGULAR,
                      marginLeft: moderateScale(5),
                      fontSize: moderateScale(12),
                    }}>
                    Available
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons
                    style={{marginTop: moderateVerticalScale(2)}}
                    name="cancel"
                    size={11}
                    color={ORANGE_300}
                  />
                  <Text
                    style={{
                      fontFamily: REGULAR,
                      marginLeft: moderateScale(5),
                      fontSize: moderateScale(12),
                    }}>
                    Not Available
                  </Text>
                </View>
              )}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: BOLD,
                  fontSize: moderateScale(22),
                  color: BLACK_LIGHT,
                  paddingTop: moderateVerticalScale(10),
                  width: scale(200),
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: BOLD,
                  fontSize: moderateScale(12),
                  color: BLACK,
                  opacity: 0.5,
                }}>
                Rs {item.price}/-
              </Text>
            </View>

            <View style={{width: 140, height: 140, marginRight: -45}}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
                source={{uri: item.image}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {cartItems.some(product => product._id === item._id) ? (
                <TouchableOpacity
                  onPress={() => remove(item)}
                  style={{
                    width: 85,
                    height: 50,
                    backgroundColor: ORANGE_300,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="remove" size={22} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    {
                      user && token && token != ''
                        ? add(item)
                        : setIsVisible(true);
                    }
                  }}
                  style={{
                    width: 85,
                    height: 50,
                    backgroundColor: ORANGE_300,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="add" size={22} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}

      <AuthCheckModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default CategoryProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  itemContainer: {
    width: '90%',
    height: moderateVerticalScale(160),
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#6B7280',
    backgroundColor: WHITE,
    marginBottom: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
    position: 'relative',
    padding: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goBack: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
});
