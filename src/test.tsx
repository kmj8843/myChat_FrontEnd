import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, Button, TextInput } from 'react-native';

import messaging from '@react-native-firebase/messaging'

const test = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [token, setToken] = useState('');

  const pressButton = (e) => {
    setIndex(index + 1);

    navigation.navigate('Chat', {
      message: `New Message(${ index })`,
      index: index
    });
  }
  
  const getFCMToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    await alert(fcmToken);
    console.log(fcmToken);

    setToken(fcmToken);
  })

  return (
    <View style = {{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <Button
        title = '새로운 메세지 받기'
        onPress = { pressButton }
      />
  
      <Button
        title = 'Token 발행'
        onPress = { getFCMToken }
      />
      <TextInput
        style = {{ backgroundColor: 'white' }}
        defaultValue = { token }
      />
    </View>
  );
}

export default test;