import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import ChatComponent from '../../components/ChatComponent';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [data, setData] = useState(null);
  const user = useSelector(state => state.userReducer.userData);

  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => getMatch());
    return focusListener;
  }, []);

  const getMatch = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.GET_MATCH}`, config)
      .then(res => {
        setData(res.data.content.matches);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView className={'flex-1 pb-16'}>
          <Header
            title={'Chat'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
          />
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Chat', {
                      data: item,
                    })
                  }
                  activeOpacity={0.7}
                  style={{
                    width: width * 0.9,
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
                    'p-3 bg-white flex flex-row items-center rounded-lg mt-2'
                  }>
                  {/* <Image
                    source={img[0].picture}
                    className={'w-12 h-12'}
                    resizeMode={'contain'}
                  /> */}
                  <Text className={'text-lg text-black font-semibold ml-4'}>
                    {item?.firstName} {item?.lastName}
                  </Text>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{alignItems: 'center', paddingBottom: 15}}
            ListEmptyComponent={
              <View>
                <Text className={'text-2xl text-black font-semibold mt-12'}>
                  No List Found
                </Text>
              </View>
            }
          />
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
    </>
  );
};

export default Index;
