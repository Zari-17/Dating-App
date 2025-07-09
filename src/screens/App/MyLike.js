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
import Header from '../../components/Header';
import MyStatusBar from '../../components/StatusBar';
import ChatComponent from '../../components/ChatComponent';

//third party library

const Index = ({navigation, route, ...props}) => {
  const data = route.params.data;

  return (
    <>
      <MyStatusBar backgroundColor={'white'} />
      <SafeAreaView className={'flex-1 bg-[#F9F9F9]'}>
        <ScrollView className={'flex-1 pb-16'}>
          <Header
            title={'My Like'}
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
    </>
  );
};

export default Index;
