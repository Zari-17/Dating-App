import React, {useRef, useEffect, useState} from 'react';
import {SafeAreaView, Dimensions, View, TouchableOpacity} from 'react-native';
import Card from '../../components/Card';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader.component';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

//third party

const {width, height} = Dimensions.get('window');

const App = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      getUser();
    });
    return focusListener;
  }, []);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    axios
      .get(`${BaseURL.GET_USERS}`, config)
      .then(res => {
        const tempResData = res.data.content.map((item, index) => {
          return {
            ...item,
            index: index++,
          };
        });
        setUsers(tempResData);
        setLoading(false);
      })
      .catch(err => {});
  };

  // const useSwiper = useRef(null);

  //FOR RIGHT
  const [indexOf, setIndexOf] = useState(0);
  const _handleLike = () => {
    setLoading(true);
    let filteredUser = users.filter(item => item.index === indexOf);

    let params = {
      likes: filteredUser[0].id,
    };

    axios
      .post(`${BaseURL.GIVE_LIKE}`, params, config)
      .then(res => {
        setLoading(false);
        getUser();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const _handleDisLike = () => {
    setLoading(true);
    let filteredUser = users.filter(item => item.index === indexOf);

    let params = {
      dislike: filteredUser[0].id,
    };

    axios
      .post(`${BaseURL.DISLIKE_USER}`, params, config)
      .then(res => {
        setLoading(false);
        getUser();
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <Header
          title={'Discover'}
          iconName={'bell'}
          isSearch
          onPress={() => navigation.navigate('Notification')}
          onPress2={() => navigation.navigate('Search')}
        />

        <View
          style={{height: height * 0.48}}
          className={'flex self-center mt-16'}>
          <Carousel
            data={users}
            renderItem={card => (
              <Card
                card={card}
                onPress={() =>
                  navigation.navigate('UserDetailHome', {
                    data: card.item,
                  })
                }
              />
            )}
            sliderWidth={width}
            itemWidth={width * 0.8}
            onSnapToItem={index => {
              setIndexOf(index);
            }}
          />
        </View>

        <View
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
            'flex self-center items-center flex-row p-4 w-80 bg-white rounded-lg justify-between px-7'
          }>
          <TouchableOpacity
            onPress={() => _handleLike()}
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
              'flex rounded-full w-16 h-16 items-center justify-center bg-white'
            }>
            <Icon name={'heart'} size={30} color="#f44336" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _handleDisLike()}
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
              'flex rounded-full w-16 h-16 items-center justify-center bg-white'
            }>
            <Icon name={'close'} size={30} color="#f44336" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading && <Loader />}
    </>
  );
};

export default App;
