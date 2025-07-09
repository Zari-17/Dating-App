import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';

//local import
import Input from '../../components/Input/index';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

//third party library

const Index = ({navigation, ...props}) => {
  const [email, setEmail] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const _handleForgetPassword = () => {
    if (email === '') {
      Alert.alert('Enter Email');
    } else {
      setIsLoader(true);
      let params = {
        email: email,
      };
      axios
        .post(`${BaseURL.FORGET_PASSWORD}`, params)
        .then(res => {
          setIsLoader(false);
          navigation.navigate('ResetPassword', {
            email: email,
          });
        })
        .catch(err => {
          setIsLoader(false);
        });
    }
  };

  return (
    <>
      <SafeAreaView className={'flex-1 bg-[#F9F9F9] items-center'}>
        <Text className={'text-[#f44336] font-medium text-[26px] mt-24'}>
          Dont Worry!
        </Text>
        <Text
          className={
            'text-gray font-medium text-[23px] text-center w-[250px] mt-5 mb-5'
          }>
          Enter your email to get recovery email.
        </Text>

        <Input
          placeholderText={'Enter Email'}
          value={email}
          handleOnChangeTxt={text => setEmail(text)}
          keyboardType={'email-address'}
        />

        <TouchableOpacity
          onPress={() => _handleForgetPassword()}
          activeOpacity={0.7}
          className={
            'w-[90%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-2'
          }>
          <Text className={'flex text-2xl font-medium text-white self-auto'}>
            Forget Passowrd
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
