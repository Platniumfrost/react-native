import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { authentication, db } from "../firebase/firebaseconfig";
import { ListItem } from "../components/ListItem";
import { Button } from "react-native-elements";

export default function Home({ navigation }) {
  const [users, setUsers] = useState([]);

  const logoutUser = async () => {
    authentication.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const getUsers = async () => {
    const docsRef = collection(db, "users");
    const q = await query(
      docsRef,
      where("userUID", "!=", authentication?.currentUser?.uid)
    );
    const docsSnap = onSnapshot(q, (onSnap) => {
      let data = [];
      onSnap.docs.forEach((user) => {
        data.push({ ...user.data() });
        setUsers(data);
        console.log(user.data());
      });
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <FlatList
        data={users}
        key={(user) => user.email}
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              navigation.navigate("Chat", {
                name: item.username,
                uid: item.userUID,
              })
            }
            title={item.username}
            subTitle={item.email}
            image={item.avatarUrl}
          />
        )}
      />
      <Button title={"Logout"} onPress={logoutUser} />
    </>
  );
}

const styles = StyleSheet.create({});
