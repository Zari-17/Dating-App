import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import
import {Images} from '../../assets/images';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import {logout} from '../../store/action/user';

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
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.userData);
  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      getProfile();
      getMyLike();
      getMatch();
      getLikeForMe();
      getIsLive();
    });
    return focusListener;
  }, []);

  const [profile, setProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [viewOwnProfileData, setViewOwnProfileData] = useState({});

  const getProfile = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.GETPROFILE}/${user?.user?.id}`, config)
      .then(res => {
        setProfile(res?.data?.content);
        let img = image.filter(
          item => item.id === Number(res?.data?.content.user.avatar),
        );
        setProfilePicture(img[0]);
        setViewOwnProfileData({
          age: res?.data?.content?.user?.age,
          avatar: res?.data?.content?.user?.avatar,
          createdAt: res?.data?.content?.user?.createdAt,
          email: res?.data?.content?.user?.email,
          firstName: res?.data?.content?.user?.firstName,
          id: res?.data?.content?.user?.id,
          lastName: res?.data?.content?.user?.lastName,
          updatedAt: res?.data?.content?.user?.updatedAt,
          childrenNoChildrenOpenToThePossibility:
            res?.data?.content?.user?.childrenNoChildrenOpenToThePossibility,
          city: res?.data?.content?.user?.city,
          ethnicity: res?.data?.content?.user?.ethnicity,
          hashtag: res?.data?.content?.user?.hashtag,
          height: res?.data?.content?.user?.height,
          hobbies: res?.data?.content?.user?.hobbies,
          longOrShortTermRelationship:
            res?.data?.content?.user?.longOrShortTermRelationship,
          occupation: res?.data?.content?.user?.occupation,
          religion: res?.data?.content?.user?.religion,
          ownProfile: true,
        });
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const [getLike, setGetLike] = useState([]);
  const getMyLike = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.MY_LIKE}`, config)
      .then(res => {
        setGetLike(
          res?.data?.content[0]?.Likes == undefined
            ? 0
            : res?.data?.content[0]?.Likes,
        );
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };
  const [matches, setMatches] = useState([]);
  const getMatch = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.GET_MATCH}`, config)
      .then(res => {
        setMatches(res.data.content.matches);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const deleteAccount = () => {
    axios
      .delete(`${BaseURL.DELETE_ACCOUNT}`, config)
      .then(res => {
        dispatch(logout());
        navigation.reset({
          index: 0,
          routes: [{name: 'Splash'}],
        });
      })
      .catch(err => {});
  };

  const [likeForMe, setLikeForMe] = useState([]);
  const getLikeForMe = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.LIKE_FOR_ME}`, config)
      .then(res => {
        setLikeForMe(res.data.content?.likedBy);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const [isLive, setIsLive] = useState('false');
  const getIsLive = () => {
    axios
      .get(`${BaseURL.IS_ACTIVE}`)
      .then(res => {
        console.log(res.data);
        setIsLive(res.data.status);
      })
      .catch(err => {});
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Account'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
          />
          <View className={'flex items-center'}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditProfile')}>
              <Image
                source={profilePicture?.picture}
                className={'w-32 h-32'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text className={'font-semibold text-3xl mt-2'}>
              {profile?.user?.firstName} {profile?.user?.lastName}
            </Text>

            {/* <Text
              className={'text-lg font-semibold text-[#f44336] mt-2'}
              onPress={() => navigation.navigate('EditUser')}>
              Edit Profile
            </Text> */}

            {isLive === 'true' && (
              <TouchableOpacity
                onPress={() => {
                  if (profile.isSubscribedToPackage == false) {
                    navigation.navigate('GetPackages');
                  } else {
                    Alert.alert('Already Subscribed!');
                  }
                }}
                activeOpacity={0.7}
                className={
                  'bg-[#f44336] w-[300] pt-2 pb-2 justify-center items-center rounded-lg mt-4'
                }>
                <Text className={'font-semibold text-white text-2xl'}>
                  Get Premium
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-9'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Messages')}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Matches
              </Text>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                {matches.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserDetailHome', {
                  data: viewOwnProfileData,
                })
              }
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                View Your Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (getLike === 0) {
                } else {
                  navigation.navigate('LikeMe', {
                    data: getLike,
                  });
                }
              }}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Like Me
              </Text>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                {getLike === 0 ? 0 : getLike.length}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Visited Me
              </Text>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                {/* {usrData?.noOfVisits} */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MyLike', {
                  data: likeForMe,
                })
              }
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                My Like
              </Text>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                {likeForMe.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Feedback')}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Give Feedback
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(logout());
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Splash'}],
                });
              }}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteAccount()}
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
              }}
              className={
                'bg-white w-[350] p-3 pl-4 pr-4 flex justify-between flex-row rounded-lg mt-4'
              }>
              <Text className={'font-semibold text-[#f44336] text-xl'}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      {/*   <Alert
        isVisible={showalert}
        onPress={() => {
          setshowalert(false);
          setalertTxt('');
        }}
        message={alertTxt}
      /> */}
    </>
  );
};

export default Index;
