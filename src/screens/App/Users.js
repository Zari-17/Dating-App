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
import NearMeCard from '../../components/NearMeCard';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => getNearMe());
    return focusListener;
  }, []);

  const [users, setUsers] = useState([]);
  const [loding, setLoading] = useState(true);

  const getNearMe = () => {
    setLoading(true);
    axios
      .get(`${BaseURL.NEAR_ME}`, config)
      .then(res => {
        setUsers(res.data.content.users);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView className={'flex-1 pb-16'}>
          <Header
            title={'Near Me'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
          />
          <FlatList
            data={users}
            renderItem={({item}) => {
              return (
                <View className={'px-4'}>
                  <NearMeCard
                    card={item}
                    onPress={() =>
                      navigation.navigate('UserDetailHome', {
                        data: item,
                      })
                    }
                  />
                </View>
              );
            }}
            contentContainerStyle={{
              width: width * 0.9,
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              paddingBottom: '10%',
              paddingTop: '2%',
            }}
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
      {loding && <Loader />}
      {/*    <Alert
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
