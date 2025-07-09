import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Input from '../../components/Input/index';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import Alert from '../../components/Alert/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, route, ...props}) => {
  const [comment, setComment] = useState('');
  const userProfile = useSelector(state => state.userReducer.userData);

  const user = route.params.data;

  const [isLoader, setIsLoader] = useState(false);
  const [alertTxt, setalertTxt] = useState('');
  const [showalert, setshowalert] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ` + userProfile?.token,
    },
  };

  const _handleReportUser = () => {
    setIsLoader(true);

    let params = {
      reportedUserId: user.id,
      message: comment,
      isBlocked: true,
    };

    axios
      .post(`${BaseURL.REPORT_USER}`, params, config)
      .then(res => {
        setIsLoader(false);
        setshowalert(true);
        setalertTxt(`${user.firstName} reported`);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Block Account'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />
          <View style={{height: height * 0.03}} />
          <Text className={'text-2xl font-semibold text-[#f44336] ml-8 mb-3'}>
            Hello, {userProfile.user.firstName} {userProfile.user.lastName}
          </Text>
          <Text className={'text-lg font-normal text-black ml-8 mb-3'}>
            Do you want to block {user.firstName} {user.lastName}?
          </Text>
          <View className={'flex self-center'}>
            <Input
              value={comment}
              handleOnChangeTxt={text => setComment(text)}
              placeholderText={'Enter Reason'}
            />
          </View>

          <TouchableOpacity
            onPressIn={() => _handleReportUser()}
            activeOpacity={0.7}
            style={{width: width * 0.85}}
            className={
              'flex justify-center items-center bg-[#f44336] pt-3 pb-3 rounded-lg mt-5 self-center'
            }
            onPress={() => {}}>
            <Text className={'flex text-2xl font-medium text-white self-auto'}>
              Block Account
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      <Alert
        isVisible={showalert}
        onPress={() => {
          setshowalert(false);
          setalertTxt('');
          navigation.navigate('Home');
        }}
        message={alertTxt}
      />
    </>
  );
};

export default Index;
