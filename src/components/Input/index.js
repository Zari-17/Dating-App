import React from 'react';
import {View, TextInput, Dimensions, Text, Image} from 'react-native';

//local import
import styles from './styles';

// dimenstion
const {width, height} = Dimensions.get('window');

//third party library

const Index = ({
  value,
  placeholderText,
  isPassword,
  handleOnChangeTxt,
  keyboardType,
  editable = true,
  ...props
}) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <TextInput
            editable={editable}
            value={value}
            placeholder={placeholderText}
            placeholderTextColor="grey"
            style={[styles.textInput]}
            onChangeText={handleOnChangeTxt}
            secureTextEntry={isPassword}
            keyboardType={keyboardType}
          />
        </View>
      </View>
    </>
  );
};

export default Index;
