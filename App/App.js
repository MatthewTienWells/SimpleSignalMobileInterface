  import React, { Component, useState, PureComponent, useCallback, useEffect  } from 'react';
import { Text, View, StyleSheet, Image, Pressable, Form, Input, Label, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupPanel from './components/GroupPanel';
// import ButtonPanel from './components/ButtonPanel';
import { Card } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat'
import messaging from '@react-native-firebase/messaging';

function Signal({route, navigation}) {
  console.log(route);
  const {groupNum} = route.params;
  const groupID = groupNum;
  console.log("Group Number: " + groupID)
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) // append the new message to present messages
}, [])

  useEffect(() => {
    // Get the notification message
    const subscribe = messaging().onMessage(async remoteMessage => {
    
        // Get the message body
        let message_body = remoteMessage.notification.body;
    
        // Get the message title
        let message_title = remoteMessage.notification.title;
    
        // Get message image
        let avatar = remoteMessage.notification.android.imageUrl;
    
        // Append the message to the current messages state
        setMessages(messages => GiftedChat.append(messages, {
            _id: Math.round(Math.random() * 1000000),
            text: message_body,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: "PartyB",
                avatar: avatar,
            },
        }));
    
        // Show an alert to the user
        Alert.alert(message_title, message_body);
    });
    
    return subscribe;
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Pressable
          onPress={() => navigation.navigate('Groups')}>
        <Image style={styles.button} source={require('./assets/Back_Button.png')} />
        </Pressable>
        <Text style={styles.title}>
          SimpleSignal
        </Text>
      </View>
      <Card>
        <ButtonPanel groupNum={route.params.groupNum} />
      </Card>
      <Card style={styles.messages}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
              _id: 1,
          }}
        />
      </Card>
    </View>
  );
}

function Groups({navigation}) {
  return (
    <View style={styles.container}>
      <GroupPanel/>
    </View>
  )
}

function LogIn({navigation}) {
  return(
    <View style={styles.container}>
      
    </View>
  )
}

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

export const sendPushNotification = async (token, title, body,) => {

    console.log(body)
    let response = await fetch("https://us-central1-simplesignal-ba161.cloudfunctions.net/addMessage?text=" + body)
    console.log("https://us-central1-simplesignal-ba161.cloudfunctions.net/addMessage?text=" + body)
    console.log("=><*", response);
  };

export const registerToken = async (token, groupNum) => {
    let response = await fetch("https://us-central1-simplesignal-ba161.cloudfunctions.net/registerToken?text=" + token + "&group=" + groupNum)
    console.log("Sent token " + token + " to group " + groupNum)
    console.log("=><*", response);
    response = await response.json();
    console.log(response);
  };

function ButtonPanel(route) {
  console.log("Passing group number value: " + route.groupNum)

  return (
    <View style={styles.buttonpanel}>
      <Pressable onPress={() => Broadcast('Go', route.groupNum)}>
        <Image style={styles.button} source={require('./assets/Go_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Stop', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/Stop_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Wait', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/Wait_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Ready', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/Ready_Button.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Happy', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/Smile.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Angry', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/Angry.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Thumbs Up', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/ThumbsUp.png')} />
      </Pressable>
      <Pressable onPress={() => Broadcast('Thumbs Down', route.groupNum)}>
      <Image style={styles.button} source={require('./assets/ThumbsDown.png')} />
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // Register background handler
  // Get the notification
  messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Extract the body
  let message_body = remoteMessage.notification.body;
  // Extract the title
  let message_title = remoteMessage.notification.title;
  // Extract the notification image 
  let avatar = remoteMessage.notification.android.imageUrl;
   
  Alert.alert(message_title, message_body);

  RegisterDevice("OC Raiders");
});
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Groups">
        <Stack.Screen name="Signal" component={Signal} />
        <Stack.Screen name="Groups" component={Groups} />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
  title: {
    justifyContent: 'center',
    color: 'blue',
    fontSize: 25
  },
  navbar: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  messages: {
    color: 'black',
  }
});


export default App;