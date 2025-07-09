import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';

//local import
import {Images} from '../../assets/images';
import {getFCMToken} from '../../store/action/user';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userReducer.isLogin);
  useEffect(() => {
    setTimeout(() => {
      if (isLogin === false) {
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomNavigator'}],
        });
      }
    }, 3000);
  }, []);

  useEffect(() => {
    // Notification
    requestUserPermission();
    createMessageListener();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        dispatch(getFCMToken(fcmToken));
      } else {
      }
    } catch (err) {}
  };

  const createMessageListener = async () => {
    //for in App
    messaging().onMessage(async remoteMessage => {});

    // APP Background or Quit
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let message = await remoteMessage;
    });

    /// when the user click on notification when app in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      let message = JSON.parse(remoteMessage.data.data);

      if (message.type === 1) {
        navigation.navigate('Chat', {
          data: message,
        });
      } else if (message.type === 2) {
        navigation.navigate('Calling', {
          data: message,
        });
      } else if (message.type === 3) {
        navigation.navigate('VideoCalling', {
          data: message,
        });
      }
    });

    // when app was in quit mode
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
        }
      });
  };

  return (
    <>
      <View className={'flex-1 bg-[#F9F9F9] justify-center items-center'}>
        <Image
          source={Images.Logo}
          className={'w-80 h-80'}
          resizeMode={'contain'}
        />
      </View>
    </>
  );
};

export default Index;
