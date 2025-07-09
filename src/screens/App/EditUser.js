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
import {Images} from '../../assets/images';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Input from '../../components/Input/index';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import SelectFaceModal from '../../components/SelectFaceModal/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';

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

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);

  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  const [isLoader, setIsLoader] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState({
    id: 1,
    picture: Images.Picture_1,
  });
  const [showFaceModal, setShowFaceModal] = useState(false);

  const getProfile = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.GETPROFILE}/${user.user.id}`, config)
      .then(res => {
        setFirstname(res.data.content.firstName);
        setLastname(res.data.content.lastName);
        setAge(res.data.content.age.toString());

        let img = image.filter(
          item => item.id === Number(res.data.content.avatar),
        );

        setAvatar({
          id: Number(res.data.content.avatar),
          picture: img[0].picture,
        });
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Edit Profile'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />

          <View className={'flex items-center'}>
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
              placeholderText={'Enter Firstname'}
              value={firstname}
              handleOnChangeTxt={text => setFirstname(text)}
            />
            <Input
              placeholderText={'Enter Lastname'}
              value={lastname}
              handleOnChangeTxt={text => setLastname(text)}
            />

            <Input
              placeholderText={'Enter Age'}
              value={age}
              handleOnChangeTxt={text => setAge(text)}
              keyboardType={'numeric'}
            />

            <TouchableOpacity
              // onPress={() => registerUser()}
              activeOpacity={0.7}
              className={
                'w-[90%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-2'
              }>
              <Text
                className={'flex text-2xl font-medium text-white self-auto'}>
                Update Profile
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
    </>
  );
};

export default Index;
