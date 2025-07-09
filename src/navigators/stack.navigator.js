import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Auth
import Splash from '../screens/Auth/Splash';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import TermsCondition from '../screens/Auth/TermsCondition';
import ResetPassword from '../screens/Auth/ResetPassword';
import Notification from '../screens/App/Notification';
import GetPackages from '../screens/App/GetPackages';
import ReportAccount from '../screens/App/ReportAccount';
import UserDetailHome from '../screens/App/UserDetailHome';

//main screen
import Chat from '../screens/App/Chat';

import Calling from '../screens/App/Calling';
import VideoCalling from '../screens/App/VideoCalling';

//bottom tab
import {BottomNavigator} from './bottom.navigator';

//third party
import {withIAPContext} from 'react-native-iap';

const Stack = createNativeStackNavigator();

export const RootNavigator = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="GetPackages"
        component={withIAPContext(GetPackages)}
      />
      <Stack.Screen name="ReportAccount" component={ReportAccount} />
      <Stack.Screen name="Calling" component={Calling} />
      <Stack.Screen name="VideoCalling" component={VideoCalling} />
      <Stack.Screen name="UserDetailHome" component={UserDetailHome} />

      {/* BOTTOM TAB */}
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
    </Stack.Navigator>
  );
};
