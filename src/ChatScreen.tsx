import React, { useState, useCallback, useEffect, useRef } from 'react';
import Toast from 'react-native-easy-toast';
import { GiftedChat } from 'react-native-gifted-chat';
import messaging from '@react-native-firebase/messaging'

import { koreaDateTime, responseToMessage } from './Utils';

const ChatScreen = ({ navigation, route }) => {
  const toastRef = useRef();
  const [messages, setMessages] = useState([]);
  
  React.useEffect(() => {
    if ( route.params?.message ) {
      let message = [
        {
          _id: route.params.index,
          text: route.params?.message,
          createdAt: koreaDateTime(),
          user: {
            _id: '1',
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ];
  
      setMessages(GiftedChat.append(messages, message));
    }
  }, [route.params?.message]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(`A new FCM message arrived!, ${ JSON.stringify(remoteMessage, null, 2) }`);

      setMessages(previousMessages => GiftedChat.append(previousMessages, responseToMessage(remoteMessage)));
    });

    return unsubscribe;
  }, []);

  const sendMessage = async ( message ) => {
    console.log(JSON.stringify(message, null, 2));
    setMessages(previousMessages => GiftedChat.append(previousMessages, message));
    let response = await fetch(`http://192.168.0.13:8080/api/v1/send/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  
    let result = await response.text();
    toastRef.current.show(result)
  
    console.log(result)
    return result;
  }
  
  return (
    <>
      <GiftedChat
        messages = {messages}
        onSend = {messages => sendMessage(messages)}
        user = {{
          _id: '61b1bf619227a058e19e3689',
        }}
        dateFormat = 'YYYY년 MM월 DD일'
        timeFormat = 'HH시 mm분'
      />

      <Toast ref={toastRef}/>
    </>
  );
}

export default ChatScreen;