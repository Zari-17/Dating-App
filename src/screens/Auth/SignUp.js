import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

//local import
import {Images} from '../../assets/images';
import Input from '../../components/Input/index';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import SelectFaceModal from '../../components/SelectFaceModal';
import SelectHashtagModal from '../../components/SelectHashtagModal';
import {login} from '../../store/action/user';
import VideoComponent from '../../components/VideoComponent/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import {hashtagEnum} from '../../utils/hashtagEnum';

const image = [
  {
    id: 1,
    picture: Images.Picture_1,
  },
  {
    id: 2,
    picture: Images.Picture_2,
  },
  {
    id: 3,
    picture: Images.Picture_3,
  },
  {
    id: 4,
    picture: Images.Picture_4,
  },
  {
    id: 5,
    picture: Images.Picture_5,
  },
  {
    id: 6,
    picture: Images.Picture_6,
  },
  {
    id: 7,
    picture: Images.Picture_7,
  },
  {
    id: 8,
    picture: Images.Picture_8,
  },
  {
    id: 9,
    picture: Images.Picture_9,
  },
  {
    id: 10,
    picture: Images.Picture_10,
  },
  {
    id: 11,
    picture: Images.Picture_11,
  },
  {
    id: 12,
    picture: Images.Picture_12,
  },
  {
    id: 13,
    picture: Images.Picture_13,
  },
  {
    id: 14,
    picture: Images.Picture_14,
  },
  {
    id: 15,
    picture: Images.Picture_15,
  },
  {
    id: 16,
    picture: Images.Picture_16,
  },
  {
    id: 17,
    picture: Images.Picture_17,
  },
  {
    id: 18,
    picture: Images.Picture_18,
  },
  {
    id: 19,
    picture: Images.Picture_19,
  },
  {
    id: 20,
    picture: Images.Picture_20,
  },
  {
    id: 21,
    picture: Images.Picture_21,
  },
  {
    id: 22,
    picture: Images.Picture_22,
  },
  {
    id: 23,
    picture: Images.Picture_23,
  },
  {
    id: 24,
    picture: Images.Picture_24,
  },
  {
    id: 25,
    picture: Images.Picture_25,
  },
  {
    id: 26,
    picture: Images.Picture_26,
  },
  {
    id: 27,
    picture: Images.Picture_27,
  },
  {
    id: 28,
    picture: Images.Picture_28,
  },
  {
    id: 29,
    picture: Images.Picture_29,
  },
  {
    id: 30,
    picture: Images.Picture_30,
  },
  {
    id: 31,
    picture: Images.Picture_31,
  },
  {
    id: 32,
    picture: Images.Picture_32,
  },
  {
    id: 33,
    picture: Images.Picture_33,
  },
  {
    id: 34,
    picture: Images.Picture_34,
  },
  {
    id: 35,
    picture: Images.Picture_35,
  },
  {
    id: 36,
    picture: Images.Picture_36,
  },
  {
    id: 37,
    picture: Images.Picture_37,
  },
  {
    id: 38,
    picture: Images.Picture_38,
  },
  {
    id: 39,
    picture: Images.Picture_39,
  },
  {
    id: 40,
    picture: Images.Picture_40,
  },
  {
    id: 41,
    picture: Images.Picture_41,
  },
  {
    id: 42,
    picture: Images.Picture_42,
  },
  {
    id: 43,
    picture: Images.Picture_43,
  },
  {
    id: 44,
    picture: Images.Picture_44,
  },
  {
    id: 45,
    picture: Images.Picture_45,
  },
  {
    id: 46,
    picture: Images.Picture_46,
  },
  {
    id: 47,
    picture: Images.Picture_47,
  },
  {
    id: 48,
    picture: Images.Picture_48,
  },
  {
    id: 49,
    picture: Images.Picture_49,
  },
  {
    id: 50,
    picture: Images.Picture_50,
  },
  {
    id: 51,
    picture: Images.Picture_51,
  },
  {
    id: 52,
    picture: Images.Picture_52,
  },
];

const Index = ({navigation, route, ...props}) => {
  const dispatch = useDispatch();

  const address = route.params;
  const fcmToken = useSelector(state => state.userReducer.token);

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');

  const [ethnicity, setEthnicity] = useState('');
  const [city, setCity] = useState('');
  const [religion, setReligion] = useState('');
  const [yourHeight, setYourHeight] = useState('');
  const [occupation, setOccupation] = useState('');
  const [relation, setRelation] = useState('');
  const [children, setChildren] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [bio, setBio] = useState('');

  const [hashtagData, setHashtagData] = useState([]);
  const [showHashtagModal, setShowHashtagModal] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [avatar, setAvatar] = useState(image[0]);
  const [hashtag, setHashtag] = useState(null);

  const [isShowWebView, setisShowWebView] = useState(false);
  const [url, setUrl] = useState('');

  const registerUser = () => {
    if (
      email == '' ||
      password == '' ||
      firstname == '' ||
      lastname == '' ||
      age == ''
    ) {
      Alert.alert('Enter details to signup!');
    } else {
      if (age < 19) {
        Alert.alert('Age Should be 18+');
      } else {
        if (termsCondition == false) {
          Alert.alert('Accept Terms & Condition');
        } else {
          setIsLoader(true);
          let params = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            avatar: avatar.id.toString(),
            age: age,
            ethnicity: ethnicity,
            city: city,
            bio: bio,
            religion: religion,
            height: yourHeight.toString(),
            occupation: occupation,
            longOrShortTermRelationship: relation,
            childrenNoChildrenOpenToThePossibility: children,
            hobbies: hobbies,
            hashtag: hashtag !== null ? hashtag?.hashtag : '',
            fcmToken: fcmToken,
          };
          axios
            .post(`${BaseURL.SIGNUP}`, params)
            .then(res => {
              setIsLoader(false);
              setToken(res.data.content.token);
              dispatch(login(res.data.content));

              if (isLive === 'false') {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomNavigator'}],
                });
              } else {
                const config = {
                  headers: {
                    Authorization: `Bearer ` + res.data.content.token,
                  },
                };
                axios
                  .get(`${BaseURL.PAYMENT_URL}`, config)
                  .then(response => {
                    setUrl(response.data.content.sessionUrl);
                    setisShowWebView(true);
                  })
                  .catch(error => {});
              }
            })
            .catch(err => {
              setIsLoader(false);
              Alert.alert('Something Went Wrong',err.data.errors[0].msg);
              console.log('err', err.data.errors[0].msg);
            });
        }
      }
    }
  };

  const [termsCondition, setTermsCondition] = useState(false);

  const handlePaymentConfirm = data => {
    if (data == 'http://localhost:3001/completion') {
      setisShowWebView(false);
      // location update
      let params2 = {
        lat: address.latitude.toString(),
        lng: address.longitude.toString(),
        address: 'asdf',
      };
      axios
        .post(`${BaseURL.POST_LOCATION}`, params2, {
          headers: {
            Authorization: `Bearer ` + token,
          },
        })
        .then(respon => {
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomNavigator'}],
          });
        })
        .catch(err => {});
      // location update
    } else if (data === 'http://localhost:3001/failure') {
      setisShowWebView(false);
      Alert.alert('Payment Failed');
    }
  };

  useEffect(() => {
    getIsLive();
    handleHashtagEnum();
  }, []);

  const handleHashtagEnum = () => {
    let tempArr = [];
    Object.values(hashtagEnum).map((item, index) => {
      tempArr.push({id: index + 1, hashtag: item});
    });
    setHashtagData(tempArr);
  };

  const [isLive, setIsLive] = useState('false');
  const getIsLive = () => {
    axios
      .get(`${BaseURL.IS_ACTIVE}`)
      .then(res => {
        console.log(res.data.status);
        setIsLive(res.data.status);
      })
      .catch(err => {});
  };

  const [isVideoModal, setIsVideoModal] = useState(false);

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
        {/* webview end */}
        <ScrollView className={'flex-1 pb-16'}>
          <View className={'flex items-center'}>
            <Text
              className={'text-[#f44336] font-medium text-[26px] mt-10 mb-2'}>
              Welcome to our Community!
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              className={'w-36 h-36 rounded-full'}
              onPress={() => setShowFaceModal(true)}>
              <Image
                source={avatar.picture}
                className={'w-36 h-36'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Input
              placeholderText={'Enter First name'}
              value={firstname}
              handleOnChangeTxt={text => setFirstname(text)}
            />
            <Input
              placeholderText={'Enter Last name'}
              value={lastname}
              handleOnChangeTxt={text => setLastname(text)}
            />
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
            <Input
              placeholderText={'Enter Age'}
              value={age}
              handleOnChangeTxt={text => setAge(text)}
              keyboardType={'numeric'}
            />
            <Input
              placeholderText={'Enter Ethnicity'}
              value={ethnicity}
              handleOnChangeTxt={text => setEthnicity(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={'Enter City'}
              value={city}
              handleOnChangeTxt={text => setCity(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={'Enter Religion'}
              value={religion}
              handleOnChangeTxt={text => setReligion(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={'Enter Bio'}
              value={bio}
              handleOnChangeTxt={text => setBio(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={'Enter Height'}
              value={yourHeight}
              handleOnChangeTxt={text => setYourHeight(text)}
              keyboardType={'numeric'}
            />
            <Input
              placeholderText={'Enter Occupation'}
              value={occupation}
              handleOnChangeTxt={text => setOccupation(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={'Enter Long term Relationship or short'}
              value={relation}
              handleOnChangeTxt={text => setRelation(text)}
              keyboardType={'email-address'}
            />
            <Input
              placeholderText={
                'Enter Children/No Children/Open to the possibility'
              }
              value={children}
              handleOnChangeTxt={text => setChildren(text)}
              keyboardType={'numeric'}
            />
            <Input
              placeholderText={'Enter Hobbies'}
              value={hobbies}
              handleOnChangeTxt={text => setHobbies(text)}
              keyboardType={'email-address'}
            />
            <View className={'w-[93%] mt-3 self-center'}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowHashtagModal(true)}
                className={
                  'self-start px-4 py-2 rounded-md border-[#f44336] border'
                }>
                <Text className={'text-slate-500 text-md'}>
                  {hashtag ? '#' + hashtag.hashtag : 'Select Hashtag'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              className={
                'flex flex-row justify-between items-center w-[93%] mb-4 mt-2'
              }>
              <Text className={'text-[#f44336] text-base'}>
                Age Shoud be 18+
              </Text>
              <View className={'flex flex-row items-center'}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setTermsCondition(!termsCondition)}>
                  <Icon
                    name={'check-circle'}
                    size={25}
                    color={termsCondition ? '#f44336' : 'black'}
                  />
                </TouchableOpacity>

                <Text
                  onPress={() => navigation.navigate('TermsCondition')}
                  className={'text-[#f44336] text-base ml-3'}>
                  Terms & Condition
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => registerUser()}
              activeOpacity={0.7}
              className={
                'w-[90%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-2'
              }>
              <Text
                className={'flex text-2xl font-medium text-white self-auto'}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsVideoModal(true);
              }}
              className={'flex-row items-center mt-5 pb-1 w-2/3'}>
              <Text
                className={
                  'text-sm font-medium self-start text-center text-black'
                }>
                $1 per month fee is a recurring monthly expense for registration
              </Text>
              <Image
                source={Images.InfoButton}
                className={'w-6 h-6 ml-4'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SignIn')}>
              <Text
                className={
                  'flex text-base font-medium text-black self-auto mt-4'
                }>
                Already a member?{' '}
                <Text
                  className={
                    'flex text-base font-medium text-[#f44336] self-auto mt-4'
                  }>
                  Login now
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      <SelectFaceModal
        isVisible={showFaceModal}
        data={image}
        _handleAvatar={item => {
          setAvatar(item);
          setShowFaceModal(false);
        }}
        onPress={() => {
          setShowFaceModal(false);
        }}
      />
      <SelectHashtagModal
        isVisible={showHashtagModal}
        data={hashtagData}
        _handleHashtag={item => {
          setHashtag(item);
          setShowHashtagModal(false);
        }}
        onPress={() => {
          setShowHashtagModal(false);
        }}
      />
      <VideoComponent
        isVisible={isVideoModal}
        onClose={() => {
          setIsVideoModal(false);
        }}
      />
    </>
  );
};

export default Index;
