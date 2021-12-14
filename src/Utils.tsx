import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const koreaDateTime = () => {
  const now = new Date();
  const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  
  return new Date(utcNow + koreaTimeDiff);
}

export const callFetch = async ( body ) => {
  let response = await fetch(`http://192.168.0.13:8080/api/v1/findByID/${body.deviceID}`);

  let result = await response.json();

  if ( result.isSuccess == false ) {
    let response = await fetch(`http://192.168.0.13:8080/api/v1/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    });
  }

  console.log(JSON.stringify(result, null, 2));
  return result;
}

export const sendMessage = async ( message ) => {
  let response = await fetch(`http://192.168.0.13:8080/api/v1/send/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });

  let result = await response.text();

  console.log(result)
  return result;
}

export const responseToMessage = (response) => {
  return message = [{
    text: response.notification.body,
    user: {
      _id: "1"
    },
    createdAt: new Date(response.sentTime),
    _id: uuidv4()
  }]
}