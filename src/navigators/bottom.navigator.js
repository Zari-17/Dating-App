import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, View, Dimensions, Platform, Text} from 'react-native';
import {Images} from '../assets/images';

//Screens
import Home from '../screens/App/Home';
import Users from '../screens/App/Users';
import Messages from '../screens/App/Messages';
import Account from '../screens/App/Account';
import EditProfile from '../screens/App/EditProfile';
import UserDetail from '../screens/App/UserDetail';
import Search from '../screens/App/Search';
import LikeMe from '../screens/App/LikeMe';
import MyLike from '../screens/App/MyLike';
import EditUser from '../screens/App/EditUser';
import Feedback from '../screens/App/Feedback';

// dimenstion
const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabImage =
  name =>
  ({focused}) => {
    return (
      <View
        style={
          !focused
            ? {
                width: width * 0.04,
                height: width * 0.04,
              }
            : {
                // width: width * 0.25,
                height: width * 0.12,
                backgroundColor: '#FFCCCB',
                borderRadius: 30,
                paddingHorizontal: width * 0.02,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }
        }>
        <Image
          source={Images[name]}
          style={{width: width * 0.04, height: width * 0.04}}
          resizeMode="contain"
        />
        {focused && (
          <Text
            style={{
              marginLeft: 10,
              fontSize: width * 0.034,
              color: '#f44336',
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
        )}
      </View>
    );
  };

export function HomeTab() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export function UsersTab() {
  return (
    <Stack.Navigator
      initialRouteName="Users"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
}
export function MessagesTab() {
  return (
    <Stack.Navigator
      initialRouteName="Messages"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Messages" component={Messages} />
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
    </Stack.Navigator>
  );
}

export function AccountTab() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="LikeMe" component={LikeMe} />
      <Stack.Screen name="MyLike" component={MyLike} />
      <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
}

export const BottomNavigator = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? height * 0.1 : height * 0.06,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: TabImage('Home'),
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="Users"
        options={{
          tabBarIcon: TabImage('Users'),
        }}
        component={UsersTab}
      />
      <Tab.Screen
        name="Messages"
        options={{
          tabBarIcon: TabImage('Messages'),
        }}
        component={MessagesTab}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarIcon: TabImage('Account'),
        }}
        component={AccountTab}
      />
    </Tab.Navigator>
  );
};
