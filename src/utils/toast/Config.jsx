import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {REGULAR, SEMIBOLD} from '../font/Font';
import {ORANGE_600, WHITE} from '../colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Config = {
  success: ({text1, text2}) => (
    <View style={styles.successContainer}>
      <Icon name="check-circle" size={24} color={WHITE} style={styles.icon} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
    </View>
  ),
  error: ({text1, text2}) => (
    <View style={styles.errorContainer}>
      <Icon name="error" size={24} color={WHITE} style={styles.icon} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
    </View>
  ),
  info: ({text1, text2}) => (
    <View style={styles.infoContainer}>
      <Icon name="info" size={24} color={WHITE} style={styles.icon} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  successContainer: {
    backgroundColor: ORANGE_600,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#FF3E3E',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#2E86C1',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontFamily: SEMIBOLD,
  },
  message: {
    color: WHITE,
    fontSize: 13,
    fontFamily: REGULAR,
  },
});

export default Config;
