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
import Loader from '../../components/Loader.component';
import Input from '../../components/Input/index';
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import Alert from '../../components/Alert/index';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const [isLoader, setIsLoader] = useState(false);

  const [feedback, setFeedback] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertTxt] = useState('');

  const giveFeedback = () => {
    setIsLoader(true);
    setShowAlert(true);
    // setIsLoader(false);
    setAlertTxt('Done');
  };

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={'Give Feedback'}
            iconName={'bell'}
            onPress={() => navigation.navigate('Notification')}
            isBack
            _handleBack={() => navigation.goBack()}
          />

          <View className={'flex items-center mt-8'}>
            <Text
              className={
                'flex self-start ml-6 text-md font-semibold text-[#f44336] mt-4 mb-4'
              }>
              Please feel free to provide feedback as this can help improve the
              app.
            </Text>
            <Input
              placeholderText={'Enter Feedback'}
              value={feedback}
              handleOnChangeTxt={text => setFeedback(text)}
            />

            <TouchableOpacity
              onPress={() => giveFeedback()}
              activeOpacity={0.7}
              className={
                'w-[90%] flex justify-center items-center bg-[#f44336] pt-4 pb-4 rounded-lg mt-2'
              }>
              <Text
                className={'flex text-2xl font-medium text-white self-auto'}>
                Feedback
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        onPress={() => {
          setShowAlert(false);
          navigation.navigate('Account');
          setIsLoader(false);
        }}
        message={alertText}
      />
    </>
  );
};

export default Index;
