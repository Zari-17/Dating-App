import React from 'react';
import {View} from 'react-native';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Index = ({navigation, route, ...props}) => {
  const data = route.params.data;

  return (
    <View style={{flex: 1}}>
      <ZegoUIKitPrebuiltCall
        appID={485938191}
        appSign={
          'be8e5850453f986e135e2c9e9c7c6b24c51173dd60cc5752c66cdf1510b21b71'
        }
        userID={data.id} // userID can be something like a phone number or the user id on your own user system.
        userName={data.firstName}
        callID={data.matchId} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

          onHangUp: () => {
            navigation.goBack();
          },
        }}
      />
    </View>
  );
};

export default Index;
