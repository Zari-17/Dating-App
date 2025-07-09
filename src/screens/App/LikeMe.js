import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
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

const Index = ({navigation, route, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const [data, setData] = useState([]);

  const [isLoader, setIsLoader] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  const getLikeMe = () => {
    setIsLoader(true);
    const data = route.params.data;
    let tempArr = [];
    data.map(item => {
      axios
        .get(`${BaseURL.GETPROFILE}/${item.likes}`, config)
        .then(res => {
          tempArr.push(res.data.content);
          setIsLoader(false);
          setData(tempArr);
          console.log('tempArr ==>', tempArr);
        })
        .catch(err => {});
    });
  };

  useEffect(() => {
    getLikeMe();
  }, []);

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView className={'flex-1 pb-16'}>
          <Header
            title={'Like Me'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <ChatComponent
                  card={item}
                  onPress={() =>
                    navigation.navigate('UserDetail', {
                      data: item,
                    })
                  }
                />
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
