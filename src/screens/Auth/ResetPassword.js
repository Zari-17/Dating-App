import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';

//local import
import Input from '../../components/Input/index';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import CustomAlert from '../../components/Alert';

//third party library

const Index = ({navigation, route, ...props}) => {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');

  const email = route.params.email;

  const [isLoader, setIsLoader] = useState(false);
  const [showalert, setshowalert] = useState(false);
  const [alertTxt, setalertTxt] = useState('');

  const _handleResetPassword = () => {
    setIsLoader(true);
    let params = {
      email: email,
      resetCode: pin,
      updatedPassword: password,
    };
    axios
      .post(`${BaseURL.RESET_PASSWORD}`, params)
      .then(res => {
        setIsLoader(false);
        setshowalert(true);
        setalertTxt('Your Password is successfully changed');
      })
      .catch(err => {
        setIsLoader(false);
        Alert.alert('Something went wrong');
      });
  };

  return (
    <>
      <SafeAreaView className={'flex-1 bg-[#F9F9F9] items-center'}>
        <Text className={'text-[#f44336] font-medium text-[26px] mt-24'}>
          Hey User!
        </Text>
        <Text
          className={
            'text-gray font-medium text-[23px] text-center w-[250px] mt-5 mb-5'
          }>
          Enter pin and reset your password
        </Text>

        <Input
          placeholderText={'Enter Pin'}
          value={pin}
          handleOnChangeTxt={text => setPin(text)}
          keyboardType={'numeric'}
        />
        <Input
          placeholderText={'Enter New Password'}
          value={password}
          handleOnChangeTxt={text => setPassword(text)}
          isPassword
        />

        <TouchableOpacity
          onPress={() => _handleResetPassword()}
          activeOpacity={0.7}
          className={
            'w-[90%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-2'
          }>
          <Text className={'flex text-2xl font-medium text-white self-auto'}>
            Reset Passowrd
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {isLoader && <Loader />}
      <CustomAlert
        isVisible={showalert}
        onPress={() => {
          setshowalert(false);
          setalertTxt('');
          navigation.navigate('SignIn');
        }}
        message={alertTxt}
      />
    </>
  );
};

export default Index;
