import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLACK,
  BLACK_300,
  BLACK_400,
  BLACK_500,
  WHITE_300,
  WHITE_500,
} from '../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  capitalize,
  type,
  bad,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: bad ? 'red' : isFocused ? '#FBAE3C' : WHITE_300,
        },
      ]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <Icon
          name={isFocused ? icon : `${icon}-outline`}
          size={14}
          color={bad ? 'red' : isFocused ? '#FBAE3C' : BLACK_400}
          style={styles.icon}
        />
        <Text
          style={{
            fontSize: 10,
            marginLeft: 8,
            color: BLACK_300,
            marginBottom: 3,
          }}>
          |
        </Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder && placeholder}
          placeholderTextColor={WHITE_500}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={'#FBAE3C'}
          autoCapitalize={capitalize ? capitalize : 'none'}
          secureTextEntry={type === 'password' && !showPassword ? true : false}
          keyboardType={type ? type : 'default'}
        />

        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              style={{
                width: 13,
                height: 13,
                tintColor: isFocused ? '#FBAE3C' : BLACK_400,
                marginLeft: 5,
                marginRight: 5,
              }}
              source={
                showPassword
                  ? require('../../images/hide.png')
                  : require('../../images/seen.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: WHITE_300,
    marginVertical: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Quicksand-Regular',
    color: BLACK,
    fontSize: 13,
    paddingHorizontal: 8,
    marginBottom: 3,
  },
  label: {
    fontFamily: 'Quicksand-SemiBold',
    color: BLACK_500,
    paddingBottom: 5,
  },
});
