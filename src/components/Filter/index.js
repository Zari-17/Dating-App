import React, {Component, useState, useCallback} from 'react';
import {View, Modal, TouchableOpacity, Dimensions} from 'react-native';
import styles from './style';
import {Images} from '../../assets/images';
import RangeSlider from '../RangeSlider';

const Index = ({navigation, ...props}) => {
  const {isVisible, onPress, _handleAvatar, data} = props;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.lModalView}>
      <View
        style={{
          width: '80%',
          marginTop: 123,
          backgroundColor: 'blue',
          paddingVertical: 10,
          alignSelf: 'center',
        }}>
        <RangeSlider from={4} to={3000} />
      </View>
      </View>
    </Modal>
  );
};

export default Index;
