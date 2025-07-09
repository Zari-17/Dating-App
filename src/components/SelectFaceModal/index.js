import React, {Component, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import styles from './style';
import {Images} from '../../assets/images';
const {width, height} = Dimensions.get('window');

const Index = ({navigation, ...props}) => {
  const {isVisible, onPress, _handleAvatar, data} = props;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableOpacity
        style={styles.centeredView}
        onPress={onPress}
        activeOpacity={1}>
        <View style={styles.lModalView}>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{marginLeft: width * 0.05}}
                  className={'w-24 h-24 rounded-full'}
                  onPress={() => _handleAvatar(item)}>
                  <Image source={item.picture} className={'w-24 h-24'} />
                </TouchableOpacity>
              );
            }}
            // style={{backgroundColor: 'blue'}}
            contentContainerStyle={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: width * 0.025,
              // backgroundColor: 'red',
              // width: width * 0.9,
              alignContent: 'center',
              marginTop: height * 0.01,
              alignSelf: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Index;
