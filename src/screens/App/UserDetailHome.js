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
import Alert from '../../components/Alert/index';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';

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

const Index = ({navigation, route, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const [isLike, setIsLike] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };
  const data = route.params.data;

  const profilePicture = image.filter(item => item.id === Number(data?.avatar));

  useEffect(() => {
    _getLikeStatus();
  }, []);

  const _getLikeStatus = () => {
    setIsLoader(true);
    let params = {
      likesDislikes: data.id,
    };

    axios
      .post(`${BaseURL.GET_LIKE_DISLIKE}`, params, config)
      .then(res => {
        console.log(res.data);
        setIsLoader(false);

        setIsLike(!isLike);
        // if (res.data.content['Last Activity'].toLowerCase() == 'dislike') {
        //   setIsLike(true);
        // } else if (res.data.content['Last Activity'].toLowerCase() == 'like') {
        //   setIsLike(false);
        // }
      })
      .catch(err => {
        console.log(err);
        setIsLoader(false);
      });
  };

  const _handleLike = () => {
    setIsLoader(true);
    let params = {
      likes: data.id,
    };

    axios
      .post(`${BaseURL.GIVE_LIKE}`, params, config)
      .then(res => {
        _getLikeStatus();
        setIsLoader(false);
        setshowalert(true);
        setalertTxt('You like this person');
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const _handleDisLike = () => {
    setIsLoader(true);
    let params = {
      dislike: data.id,
    };

    axios
      .post(`${BaseURL.GIVE_DISLIKE}`, params, config)
      .then(res => {
        _getLikeStatus();
        setIsLoader(false);
        setshowalert(true);
        setalertTxt('You Dislike this person');
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const [isLoader, setIsLoader] = useState(false);
  const [showalert, setshowalert] = useState(false);
  const [alertTxt, setalertTxt] = useState('');

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={data?.firstName + ' Detail'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />
          <View className={'flex items-center'}>
            <Image
              source={profilePicture[0].picture}
              className={'w-32 h-32'}
              resizeMode={'contain'}
            />
            <Text className={'font-semibold text-3xl mt-2'}>
              {data?.firstName} {data?.lastName}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                width: width * 0.9,
              }}
              className={
                'bg-white rounded-lg mt-9 flex-row py-3 px-2 items-center justify-between'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                Email:
              </Text>
              <Text className={'font-semibold text-[#f44336] text-base'}>
                {data.email}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                width: width * 0.9,
              }}
              className={
                'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                Age:
              </Text>
              <Text className={'font-semibold text-[#f44336] text-base'}>
                {data.age}
              </Text>
            </TouchableOpacity>

            {data.city && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  City:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.city}
                </Text>
              </TouchableOpacity>
            )}

            {data.ethnicity && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Ethnicity:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.ethnicity}
                </Text>
              </TouchableOpacity>
            )}

            {data.height && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Height:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.height}
                </Text>
              </TouchableOpacity>
            )}

            {data.hobbies && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Hobbies:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.hobbies}
                </Text>
              </TouchableOpacity>
            )}

            {data.longOrShortTermRelationship && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Relationship:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.longOrShortTermRelationship}
                </Text>
              </TouchableOpacity>
            )}

            {data.occupation && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Occupation:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.occupation}
                </Text>
              </TouchableOpacity>
            )}

            {data.religion && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Religion:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.religion}
                </Text>
              </TouchableOpacity>
            )}

            {data.childrenNoChildrenOpenToThePossibility && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Children:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  {data.childrenNoChildrenOpenToThePossibility}
                </Text>
              </TouchableOpacity>
            )}

            {data.hashtag && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 6,
                  width: width * 0.9,
                }}
                className={
                  'bg-white rounded-lg mt-5 flex-row py-3 px-2 items-center justify-between'
                }>
                <Text className={'font-semibold text-[#f44336] text-xl mr-2'}>
                  Hashtag:
                </Text>
                <Text className={'font-semibold text-[#f44336] text-base'}>
                  #{data.hashtag}
                </Text>
              </TouchableOpacity>
            )}

            {!data.ownProfile && (
              <TouchableOpacity
                onPress={() => {
                  if (!data.ownProfile) {
                    if (isLike) _handleLike();
                    else _handleDisLike();
                  }
                }}
                style={{width: width * 0.9}}
                activeOpacity={0.7}
                className={'bg-[#f44336]  p-3 pl-4 pr-4 flex rounded-lg mt-4'}>
                <Text
                  className={'text-white flex text-center font-bold text-2xl'}>
                  {!isLike ? 'Dislike' : 'Like'}
                </Text>
              </TouchableOpacity>
            )}

            {!data.ownProfile && (
              <TouchableOpacity
                onPress={() => {
                  if (!data.ownProfile) {
                    navigation.navigate('ReportAccount', {
                      data: data,
                    });
                  }
                }}
                activeOpacity={0.7}
                style={{width: width * 0.9}}
                className={'bg-[#f44336] p-3 pl-4 pr-4 flex rounded-lg mt-4'}>
                <Text
                  className={'text-white flex text-center font-bold text-2xl'}>
                  Report Person
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
