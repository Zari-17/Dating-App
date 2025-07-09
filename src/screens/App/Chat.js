import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
// import styles from './Styles';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

//local
const {width, height} = Dimensions.get('window');
import LoaderView from '../../components/Loader.component';
// import {icons} from '../../constant/assets';
import {Images} from '../../assets/images/index';

// redux
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../../components/StatusBar';

import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import VoiceRecorder from '../../components/VoiceRecorder';

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
const audioRecorderPlayer = new AudioRecorderPlayer();

const Index = ({navigation, route, ...props}) => {
  const userChat = route.params.data;
  // //USER DATA
  const user = useSelector(state => state.userReducer.userData.user);
  const token = useSelector(state => state.userReducer.userData.token);

  const [loader, setloader] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [text, onChangeText] = useState('');
  const [chatList, setchatList] = useState();

  const onStartRecord = async () => {
    setIsRecording(true);
    const path = `${(Math.random() * 1000) / 10}audio.m4a`;
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSec(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    setRecordSec(0);
    setRecordTime('00:00:00');
    console.log('Stop Recorder', result);
  };

  const sendVoiceMessage = async () => {
    const reference = database().ref(userChat?.matchId);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    var fd = new FormData();
    const uri = result.replace('file://', '');

    fd.append('file', {uri: uri, type: 'audio', name: 'voicemail'});
    fd.append('upload_preset', 'xqc51vjr');
    fd.append('cloud_name', 'dbcd4tkly');

    fetch('https://api.cloudinary.com/v1_1/dbcd4tkly/upload', {
      method: 'post',
      body: fd,
    })
      .then(res => res.json())
      .then(result => {
        if (result?.url) {
          reference
            .push({
              type: 4,
              data: result?.url,
              user: user.id,
              to: userChat?.id,
              firstName: user?.firstName,
              avatar: user?.avatar,
              matchId: userChat?.matchId,
              timeDuration: recordSec,
            })
            .then(res => {
              setIsRecording(false);
              setRecordSec(0);
              setRecordTime('00:00:00');
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          setIsRecording(false);
          setRecordSec(0);
          setRecordTime('00:00:00');
          alert('Something went wrong please try again!');
        }
      })
      .catch(err => {
        console.log(err);
        setIsRecording(false);
        setRecordSec(0);
        setRecordTime('00:00:00');
        alert('Something went wrong please try again!');
      });
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      handleSubscription();
      getIsLive();
    });
    return focusListener;
  }, []);

  useEffect(() => {
    handleSubscription();
    fetchingData();
    getIsLive();
  }, []);

  const fetchingData = () => {
    setloader(true);

    database()
      .ref(userChat?.matchId)
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          // li.push({
          //   data: child.val().data,
          //   user: child.val().user,
          //   type: child.val().type,
          // });
          li.push(child.val());
        });
        setchatList(li.reverse());
        setloader(false);
      });
  };

  //Sending in realTime Database
  const sendMessage = () => {
    const reference = database().ref(userChat?.matchId);

    if (text) {
      reference
        .push({
          type: 1,
          data: text,
          user: user?.id,
          to: userChat?.id,
          firstName: user?.firstName,
          avatar: user?.avatar,
          matchId: userChat?.matchId,
        })
        .then(res => {
          onChangeText('');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if (isRecording) {
        sendVoiceMessage();
      } else {
        onStartRecord();
      }
    }
  };

  const img = image.filter(item => item.id === Number(userChat?.avatar));

  const config = {
    headers: {
      Authorization: `Bearer ` + token,
    },
  };
  const [isCalling, setIsCalling] = useState(false);
  const handleSubscription = () => {
    axios
      .get(`${BaseURL.GETPROFILE}/${user?.id}`, config)
      .then(response => {
        setIsCalling(response?.data.content?.isSubscribedToPackage);
      })
      .catch(err => {});
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

  const handleCall = () => {
    if (isLive !== 'false' && isCalling) {
      const reference = database().ref(userChat?.matchId);

      reference
        .push({
          type: 2,
          data: `${user.firstName} is calling you`,
          user: user.id,
          to: userChat?.id,
          firstName: user?.firstName,
          avatar: user?.avatar,
          matchId: userChat?.matchId,
        })
        .then(res => {})
        .catch(error => {});

      navigation.navigate('Calling', {data: userChat});
    } else {
      navigation.navigate('GetPackages');
    }
  };

  const handleVideoCall = () => {
    if (isLive !== 'false' && isCalling) {
      const reference = database().ref(userChat?.matchId);

      reference
        .push({
          type: 3,
          data: `${user.firstName} is video calling you`,
          user: user.id,
          to: userChat?.id,
          firstName: user?.firstName,
          avatar: user?.avatar,
          matchId: userChat?.matchId,
        })
        .then(res => {})
        .catch(error => {});

      navigation.navigate('VideoCalling', {data: userChat});
    } else {
      navigation.navigate('GetPackages');
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f44336',
        }}>
        <View
          style={{
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: height * 0.02,
            paddingHorizontal: width * 0.04,
            // backgroundColor: 'blue',
            marginTop: height * 0.06,
          }}>
          <View className={'flex flex-row items-center'}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}>
              <Image
                source={Images.whiteArrow}
                className={'w-6 h-6 mr-2'}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {/* <Image
              source={img[0]?.picture}
              className={'w-12 h-12'}
              resizeMode={'contain'}
            /> */}
            <Text className={'text-base text-white font-semibold ml-3'}>
              {userChat?.firstName}
            </Text>
          </View>
          <View className={'flex flex-row items-center'}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('ReportAccount', {data: userChat})
              }>
              <Icons name={'report'} size={30} color="white" />
            </TouchableOpacity>

            <View className={'flex flex-row'}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCall()}>
                <Image
                  source={Images.phoneCall}
                  className={'w-6 h-6 ml-4'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleVideoCall()}>
                <Image
                  source={Images.video}
                  className={'w-8 h-8 ml-4'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          inverted={true}
          showsVerticalScrollIndicator={false}
          style={{
            width: width,
            alignSelf: 'center',
            backgroundColor: 'white',
          }}
          data={chatList}
          renderItem={({item}) => {
            if (item.user == user.id) {
              if (item.type == 4) {
                return (
                  <View style={styles.MsgContainerReceiver}>
                    <View style={{alignSelf: 'flex-end'}}>
                      <VoiceRecorder
                        isRight={false}
                        audioPath={item.data}
                        timeDuration={item.timeDuration}
                      />
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.MsgContainerReceiver}>
                    <View style={styles.SenderMsgContainer}>
                      <Text style={styles.SenderMsgText}>{item.data}</Text>
                    </View>
                  </View>
                );
              }
            } else {
              if (item.type == 4) {
                return (
                  <View style={styles.MsgContainerReceiver}>
                    <View style={{alignSelf: 'flex-start'}}>
                      <VoiceRecorder
                        isRight={true}
                        audioPath={item.data}
                        timeDuration={item.timeDuration}
                      />
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.MsgContainerReceiver}>
                    <View style={styles.ReceiverMsgContainer}>
                      <Text
                        style={
                          item.type == 2 || item.type == 3
                            ? {fontWeight: 'bold', color: 'black'}
                            : styles.ReceiverMsgText
                        }>
                        {item.data}
                      </Text>
                    </View>
                  </View>
                );
              }
            }
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View style={styles.TypeContainer}>
            {isRecording ? (
              <View style={styles.audioBox}>
                <Text className={'text-base text-gray font-semibold ml-3'}>
                  {recordTime}
                </Text>
                <TouchableOpacity
                  style={styles.ChatButton}
                  onPress={() => onStopRecord()}>
                  <Icon name={'close'} size={25} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.TextInput}>
                <TextInput
                  placeholder={'Enter Message'}
                  placeholderTextColor={'black'}
                  keyboardType={'default'}
                  multiline={true}
                  onChangeText={onChangeText}
                  value={text}
                  style={{
                    fontSize: width * 0.04,
                    width: width * 0.75,
                    color: 'black',
                    marginLeft: width * 0.04,
                  }}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.ChatButton}
              onPress={() => sendMessage()}>
              <Icon
                name={!text ? (isRecording ? 'send' : 'microphone') : 'send'}
                size={30}
                color="#f44336"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      {loader && <LoaderView />}
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.RGB,
    backgroundColor: '#B87261',
    // borderTopLeftRadius:100
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  Header: {
    width: width,
    height: height * 0.125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: width * 0.04,
    // backgroundColor: 'green',
  },
  backArrowCont: {
    width: width * 0.08,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  backArrow: {
    width: '65%',
    height: '65%',
  },
  profleNameCont: {
    width: '80%',
    height: '80%',
    flexDirection: 'row-reverse',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  profileImgCont: {
    width: width * 0.135,
    height: width * 0.135,
    borderRadius: width / 2,
    overflow: 'hidden',
    // backgroundColor: 'green',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  chatTxt: {
    color: 'black',
    fontSize: width * 0.045,
    marginRight: width * 0.05,
  },
  userNameTxt: {
    fontWeight: 'bold',
  },

  ScrollViewCont: {
    height: height * 0.8,
  },
  ScrollMsg: {
    // marginTop: height * 0.08,
    marginTop: -25,
    width: width,
    alignSelf: 'center',
    // marginBottom: height * 0.015,
    backgroundColor: 'white',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  MsgContainerReceiver: {
    marginVertical: height * 0.005,
    width: '90%',
    // backgroundColor: 'red',
    marginLeft: width * 0.04,
    flexDirection: 'column',
  },
  MsgContainerSender: {
    marginVertical: height * 0.005,
    width: '96%',
    // backgroundColor: 'red',
    marginRight: width * 0.04,
  },
  ReceiverMsgContainer: {
    backgroundColor: '#EAECEC',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    alignSelf: 'flex-start',
    // padding: width * 0.03,
    borderRadius: 30,
  },

  ReceiverMsgText: {
    fontSize: width * 0.036,
    color: 'black',
  },
  MsgtimerReceiver: {
    color: '#9C9D9E',
    fontSize: width * 0.03,
    width: width * 0.09,
    alignSelf: 'flex-start',
  },
  MsgtimerSender: {
    color: '#9C9D9E',
    fontSize: width * 0.03,
    width: width * 0.09,
    alignSelf: 'flex-end',
  },
  SenderMsgContainer: {
    backgroundColor: '#f44336',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    alignSelf: 'flex-end',
    // padding: width * 0.03,
    marginRight: width * 0.03,
    borderRadius: 30,
  },

  SenderMsgText: {
    color: 'white',
    fontSize: width * 0.036,
  },

  MsgTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.07,
    // height: '100%',
    width: '74%',
  },
  SendIcon: {
    width: '70%',
    height: '70%',
  },
  TypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.09,
    width: width,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
  },
  TextInput: {
    width: width * 0.8,
    height: height * 0.06,
    paddingHorizontal: width * 0.02,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f44336',
    // marginTop: height * 0.01,
    borderRadius: 40,
    marginLeft: width * 0.03,
  },
  audioBox: {
    width: width * 0.8,
    height: height * 0.06,
    paddingHorizontal: width * 0.02,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f44336',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: height * 0.01,
    borderRadius: 40,
    marginLeft: width * 0.03,
  },
  ChatButton: {
    height: width * 0.125,
    width: width * 0.125,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
    // alignSelf: 'flex-start',
    marginRight: 5,
  },
  moreOptionCont: {
    width: '15%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  moreOption: {
    width: width * 0.11,
    height: height * 0.07,
    // backgroundColor:'red'
  },
});
