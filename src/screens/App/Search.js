import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
//local import
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import SelectHashtagModal from '../../components/SelectHashtagModal';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import NearMeCard from '../../components/NearMeCard';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import {hashtagEnum} from '../../utils/hashtagEnum';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);

  const [loding, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [hashtag, setHashtag] = useState(null);
  const [hashtagData, setHashtagData] = useState([]);
  const [showHashtagModal, setShowHashtagModal] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ` + user?.token,
    },
  };

  const handleHashtagEnum = () => {
    let tempArr = [];
    Object.values(hashtagEnum).map((item, index) => {
      tempArr.push({id: index + 1, hashtag: item});
    });
    setHashtagData(tempArr);
  };

  useEffect(() => {
    handleHashtagEnum();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (hashtag !== null) {
      axios
        .get(
          `${BaseURL.GET_PROFILE_USING_HASHTAG}/${
            hashtag !== null ? hashtag.hashtag : ''
          }`,
          config,
        )
        .then(res => {
          setLoading(false);
          setUsers(res.data.content);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else setLoading(false);
  }, [hashtag]);

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <Header
          title={'Search'}
          iconName={'bell'}
          onPress={() => navigation.navigate('Notification')}
        />
        <View className={'w-full items-center justify-center'}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (hashtag == null) setShowHashtagModal(true);
            }}
            className={
              'w-[90%] bg-[#dfdfdf] rounded-lg flex-row items-center justify-between px-4 py-2'
            }>
            <Text
              className={'px-2 py-1 overflow-hidden rounded-lg  text-[#4f4f4f]'}
              style={{
                backgroundColor: hashtag !== null ? '#c6c6c6' : undefined,
              }}>
              {hashtag !== null ? '#' + hashtag.hashtag : ''}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (hashtag !== null) {
                  setHashtag(null);
                  setUsers([]);
                } else {
                  setShowHashtagModal(true);
                }
              }}>
              <Icon
                name={hashtag !== null ? 'close' : 'search'}
                size={22}
                color="#adadad"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <FlatList
          data={users}
          ListFooterComponent={() => <View className={'h-10'} />}
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
            <View className={' flex-1 items-center'}>
              <Text className={'text-2xl text-black font-semibold mt-12'}>
                No List Found
              </Text>
            </View>
          }
        />
      </SafeAreaView>
      {loding && <Loader />}
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
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
