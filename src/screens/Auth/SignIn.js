import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

//local import
import {Images} from '../../assets/images';
import Input from '../../components/Input/index';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import {login} from '../../store/action/user';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {WebView} from 'react-native-webview';

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const fcmToken = useSelector(state => state.userReducer.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const userLogin = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      setIsLoader(true);
      let params = {
        email: email,
        password: password,
        fcmToken: fcmToken,
      };
      axios
        .post(`${BaseURL.LOGIN}`, params)
        .then(res => {
          setIsLoader(false);

          let params2 = {
            lat: currentLatitude.toString(),
            lng: currentLongitude.toString(),
            address: 'asdf',
          };
          axios
            .patch(`${BaseURL.UPDATE_LOCATION}`, params2, {
              headers: {
                Authorization: `Bearer ` + res.data.content.token,
              },
            })
            .then(resss => {
              axios
                .get(`${BaseURL.GETPROFILE}/${res.data.content.user.id}`, {
                  headers: {
                    Authorization: `Bearer ` + res.data.content.token,
                  },
                })
                .then(response => {
                  if (response?.data.content.isPaymentCompleted === false) {
                    Alert.alert('Your Payment is Not Done Yet');
                    handlePayment(res.data.content.token);
                  } else {
                    dispatch(login(res.data.content));
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'BottomNavigator'}],
                    });
                  }
                })
                .catch(err => {
                  setIsLoader(false);
                });
            })
            .catch(err => {});
        })
        .catch(err => {
          setIsLoader(false);
          Alert.alert('Wrong Email / Password');
        });
    }
  };

  const handlePayment = token => {
    const config = {
      headers: {
        Authorization: `Bearer ` + token,
      },
    };
    axios
      .get(`${BaseURL.PAYMENT_URL}`, config)
      .then(response => {
        setUrl(response.data.content.sessionUrl);
        setisShowWebView(true);
      })
      .catch(error => {});
  };

  // LOCATION
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const [isShowWebView, setisShowWebView] = useState(false);
  const [url, setUrl] = useState('');

  const handlePaymentConfirm = data => {
    if (data == 'http://localhost:3001/completion') {
      setisShowWebView(false);
    } else if (data === 'http://localhost:3001/failure') {
      setisShowWebView(false);
      Alert.alert('Payment Failed');
    }
  };

  return (
    <>
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        {isShowWebView && (
          <View
            style={{
              width: width,
              height: height,
              zIndex: 100,
              position: 'absolute',
            }}>
            <WebView
              source={{
                uri: url,
              }}
              style={{
                width: width,
                height: height,
                zIndex: 100,
                position: 'absolute',
              }}
              onNavigationStateChange={event => {
                handlePaymentConfirm(event.url);
              }}
              onError={event => {}}
            />
          </View>
        )}
        <ScrollView className={'flex-1 pb-16'}>
          <View className={'flex items-center'}>
            <Image
              source={Images.Logo}
              className={'w-64 h-40 mt-40'}
              resizeMode={'contain'}
            />
            <Text
              className={'text-[#f44336] font-medium text-[26px] mt-1 mb-2'}>
              Hello Again!
            </Text>
            <Input
              placeholderText={'Enter Email'}
              value={email}
              handleOnChangeTxt={text => setEmail(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={'Enter Password'}
              value={password}
              handleOnChangeTxt={text => setPassword(text)}
              isPassword
            />
            <Text
              style={{alignSelf: 'flex-end'}}
              className={'flex text-lg font-medium text-gray self-auto mr-4'}
              onPress={() => navigation.navigate('ForgetPassword')}>
              Forget Password?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              className={
                'w-[90%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-2'
              }
              onPress={() => {
                // navigation.navigate('BottomNavigator');
                userLogin();
              }}>
              <Text
                className={'flex text-2xl font-medium text-white self-auto'}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('SignUp', {
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                })
              }>
              <Text
                className={
                  'flex text-base font-medium text-black self-auto mt-4'
                }>
                Not a member?{' '}
                <Text
                  className={
                    'flex text-base font-medium text-[#f44336] self-auto mt-4'
                  }>
                  Register now
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
