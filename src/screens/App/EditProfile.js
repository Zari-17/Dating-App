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

//third party library
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
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
  const user = useSelector(state => state.userReducer.userData);

  const [hashtag, setHashtag] = useState(
    user?.user?.hashtag ? {id: 1, hashtag: user?.user?.hashtag} : null,
  );
  const [hashtagData, setHashtagData] = useState([]);
  const [showHashtagModal, setShowHashtagModal] = useState(false);

  const [firstname, setFirstname] = useState(user?.user?.firstName);
  const [lastname, setLastname] = useState(user?.user?.lastName);
  const [age, setAge] = useState(String(user?.user?.age));

  const [ethnicity, setEthnicity] = useState(user?.user?.ethnicity);
  const [city, setCity] = useState(user?.user?.city);
  const [religion, setReligion] = useState(user?.user?.religion);
  const [yourHeight, setYourHeight] = useState(user?.user?.height);
  const [occupation, setOccupation] = useState(user?.user?.occupation);
  const [relation, setRelation] = useState(
    user?.user?.longOrShortTermRelationship,
  );
  const [children, setChildren] = useState(
    user?.user?.childrenNoChildrenOpenToThePossibility,
  );
  const [hobbies, setHobbies] = useState(user?.user?.hobbies);
  const [bio, setBio] = useState(user?.user?.bio);

  const [showFaceModal, setShowFaceModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [avatar, setAvatar] = useState({
    id: user?.user?.avatar,
    picture: image.filter(x => x.id == user?.user?.avatar)[0]?.picture,
  });

  const editProfile = () => {
    if (firstname == '' || lastname == '' || age == '') {
      Alert.alert('Enter details to signup!');
    } else {
      if (age < 19) {
        Alert.alert('Age Should be 18+');
      } else {
        setIsLoader(true);
        let params = {
          email: user?.user?.email,
          firstName: firstname,
          lastName: lastname,
          avatar: avatar?.id?.toString(),
          age: age,
          ethnicity: ethnicity !== null ? ethnicity : '',
          city: city !== null ? city : '',
          bio: bio !== null ? bio : '',
          religion: religion !== null ? religion : '',
          height: yourHeight !== null ? yourHeight.toString() : '',
          occupation: occupation !== null ? occupation : '',
          longOrShortTermRelationship: relation !== null ? relation : '',
          childrenNoChildrenOpenToThePossibility:
            children !== null ? children : '',
          hobbies: hobbies !== null ? hobbies : '',
          hashtag: hashtag !== null ? hashtag?.hashtag : '',
        };
        axios
          .patch(`${BaseURL.SIGNUP}/` + user?.user?.id, params)
          .then(res => {
            setIsLoader(false);
            dispatch(login(res.data.content));
            navigation.goBack();
          })
          .catch(err => {
            setIsLoader(false);
            Alert.alert('Something Went Wrong');
            console.log('err', err);
          });
      }
    }
  };

  const handleHashtagEnum = () => {
    let tempArr = [];
    Object.values(hashtagEnum).map((item, index) => {
      tempArr.push({id: index + 1, hashtag: item});
    });
    tempArr.unshift({id: Object.keys(hashtagEnum).length + 4, hashtag: 'None'});
    setHashtagData(tempArr);
  };

  useEffect(() => {
    handleHashtagEnum();
  }, []);

  return (
    <>
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView className={'flex-1 pb-16'}>
          <Header
            title={'Edit Profile'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />
          <View className={'flex items-center mt-2'}>
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

            <View className={'w-[93%] mt-2 self-center'}>
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

            <TouchableOpacity
              onPress={() => editProfile()}
              activeOpacity={0.7}
              className={
                'w-[93%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-4'
              }>
              <Text
                className={'flex text-2xl font-medium text-white self-auto'}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View className={'h-6'} />
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
          if (item.hashtag != 'None') {
            setHashtag(item);
            setShowHashtagModal(false);
          } else {
            setHashtag(null);
            setShowHashtagModal(false);
          }
        }}
        onPress={() => {
          setShowHashtagModal(false);
        }}
      />
    </>
  );
};

export default Index;
