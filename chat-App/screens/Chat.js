import { StyleSheet } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { authentication } from "../firebase/firebaseconfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export default function Chat({ route }) {
  const uid = route.params.uid;
  const [messages, setMessages] = useState([]);
  const currentUser = authentication?.currentUser?.uid;

  //   useEffect(() => {
  //     setMessages([
  //       {
  //         _id: Math.random().toString(36).substring(7), // Generate a unique ID for each message
  //         text: "Hello developer",
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: "React Native",
  //           avatar:
  //             "https://upload.wikimedia.org/wikipedia/commons/7/7c/Boracay%2C_1985_%288758953461%29.jpg",
  //         },
  //       },
  //     ]);
  //   }, []);

  useEffect(() => {
    const chatId = [currentUser, uid].sort().join("-");
    const colRef = collection(doc(db, "chatrooms", chatId), "messages");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const docSnap = onSnapshot(q, (onSnap) => {
      const allMsg = onSnap.docs.map((mes) => {
        if (mes.data().createdAt) {
          return {
            ...mes.data(),
            createdAt: mes.data().createdAt.toDate(),
          };
        } else {
          return {
            ...mes.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allMsg);
    });
  }, []);

  const onSend = useCallback((messagesArray) => {
    const msg = messagesArray[0];
    const myMsg = {
      ...msg,
      sentBy: currentUser,
      sentTo: uid,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    const chatId = [currentUser, uid].sort().join("-");
    const colRef = collection(doc(db, "chatrooms", chatId), "messages");
    addDoc(colRef, {
      ...myMsg,
      createdAt: serverTimestamp(),
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: currentUser,
      }}
    />
  );
}

const styles = StyleSheet.create({});
