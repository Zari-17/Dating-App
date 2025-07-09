import React, {Component} from 'react';
import {View, Modal, Dimensions, TouchableOpacity} from 'react-native';
import styles from './style';
import {Videos} from '../../assets/video/index';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

const Index = ({navigation, isVisible, onClose, ...props}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableOpacity
        activeOpacity={2}
        style={styles.centeredView}
        onPress={onClose}>
        <Video
          source={Videos.video} // Can be a URL or a local file.
          style={{
            width: width * 0.9,
            height: height * 0.4,
          }}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default Index;
