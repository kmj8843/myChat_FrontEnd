import React, { useState, useCallback, useEffect } from 'react'
import { TabBarIOSItem, Text, View, Button, Alert, TextInput } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { GiftedChat } from 'react-native-gifted-chat'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import messaging from '@react-native-firebase/messaging'

import ChatScreen from './src/ChatScreen';
import MyProfileScreen from './src/MyProfileScreen';
import test from './src/test';

import { callFetch } from './src/Utils';

const Tab = createBottomTabNavigator();

const App = () => {
  const [userIdx, setUserIdx] = useState(-1);
  
  const loadUserData = useCallback(async () => {
    let token = await messaging().getToken();
    console.log(token)
    let deviceID = DeviceInfo.getUniqueId();
    let name = 'MyAVD';

    let body = {
      'name': name,
      'deviceID': deviceID,
      'token': token
    }
    console.log(JSON.stringify(body, null, 2));
    callFetch( body );
  });

  useEffect( () => {
    loadUserData();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(`A new FCM message arrived!, ${ JSON.stringify(remoteMessage, null, 2) }`);
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Chat" component = { ChatScreen } />
        <Tab.Screen name = "Profile" component = { MyProfileScreen } />
        <Tab.Screen name = "test" component = { test } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;