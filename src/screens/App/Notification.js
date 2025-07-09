import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');

//local import
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';

import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getNotification();
  }, []);

  const [data, setData] = useState([]);
  const getNotification = () => {
    setIsLoader(true);
    axios
      .get(`${BaseURL.GET_NOTIFICATION}`, config)
      .then(res => {
        setIsLoader(false);
        setData(res.data.content?.notifications);
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
            title={'Notification'}
            //iconName={'edit'}
            isBack
            _handleBack={() => navigation.goBack()}
          />

          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: width * 0.9,
                  }}
                  className={
                    'flex self-center py-3 border-2 border-[#f44336] mt-3 pl-3 rounded-lg bg-white'
                  }>
                  <Text className={'text-lg font-normal text-black'}>
                    {index + 1}. {item.content}
                  </Text>
                </View>
              );
            }}
            ListEmptyComponent={
              <View className={'flex items-center'}>
                <Text className={'text-2xl font-bold text-black mt-12'}>
                  No Notification Found
                </Text>
              </View>
            }
          />
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      {/* <Alert
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
