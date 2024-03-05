import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authentication } from "../firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const registerUser = async () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const userUID = userCredentials.user.uid;
        const docRef = doc(db, "users", userUID);
        const docSnap = setDoc(docRef, {
          avatarUrl: avatar
            ? avatar
            : "https://thumbs.dreamstime.com/b/businessman-avatar-line-icon-vector-illustration-design-79327237.jpg",
          username,
          password,
          userUID,
          email,
        });
      })
      .then(() => console.log("succesful"));
  };

  return (
    <View>
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        leftIcon={{ type: "material", name: "email" }}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        leftIcon={{ type: "material", name: "lock" }}
        secureTextEntry
      />
      <Input
        placeholder="Username"
        label="username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        leftIcon={{ type: "material", name: "account-circle" }}
      />
      <Input
        placeholder="Avatar url"
        label="Avatar"
        value={avatar}
        onChangeText={(text) => setAvatar(text)}
        leftIcon={{ type: "material", name: "link" }}
      />
      <Button
        onPress={registerUser}
        title="Register"
        buttonStyle={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 10,
  },
});
