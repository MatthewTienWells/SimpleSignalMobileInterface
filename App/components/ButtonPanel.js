import * as React from 'react';
import {View, StyleSheet, Image, Pressable } from 'react-native';
import messaging from '@react-native-firebase/messaging';

function Broadcast(iconNum, groupNum) {
  const sendNotif = async () => {
    const fcmToken = await messaging().getToken();
     if (fcmToken) {
        console.log(fcmToken);
     } 
    sendPushNotification(
      fcmToken,
      "alert",
      iconNum,
    );
   }
   RegisterDevice(groupNum)
   sendNotif();
}

function RegisterDevice(groupNum) {
  const addToGroup = async () => {
    const fcmToken = await messaging().getToken();
     if (fcmToken) {
        console.log(fcmToken);
     } 
    registerToken(
      fcmToken,
      groupNum,
    );
   }
   addToGroup();
}

export const registerToken = async (token, groupNum) => {
  let response = await fetch("https://us-central1-simplesignal-ba161.cloudfunctions.net/registerToken?text=" + token + "&group=" + groupNum)
  console.log("Sent token " + token + " to group " + groupNum)
  console.log("=><*", response);
  response = await response.json();
  console.log(response);
};

function ButtonPanel({ groupNum }) {
  console.log("Passing group number value: " + {groupNum})
  return (
    <View style={styles.buttonpanel}>
      <Pressable onPress={() => Broadcast('1', {groupNum})}>
        <Image style={styles.button} source={require('../assets/Go_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('2', groupNum)}>
      <Image style={styles.button} source={require('../assets/Stop_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('3', groupNum)}>
      <Image style={styles.button} source={require('../assets/Wait_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('4', groupNum)}>
      <Image style={styles.button} source={require('../assets/Ready_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('5', groupNum)}>
      <Image style={styles.button} source={require('../assets/Smile.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('6', groupNum)}>
      <Image style={styles.button} source={require('../assets/Angry.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('7', groupNum)}>
      <Image style={styles.button} source={require('../assets/ThumbsUp.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('8', groupNum)}>
      <Image style={styles.button} source={require('../assets/ThumbsDown.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonpanel: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flexWrap: "wrap",
    overflowY: "scroll",
    height: 250,
    backgroundColor: "#d1dfe0",
  },
  button: {
    height: 70,
    width: 70,
  }
});
