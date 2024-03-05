import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase/firebaseconfig";
import { useContext } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    signInWithEmailAndPassword(authentication, email, password).then(() => {
      console.log("user logged in");
    });
  };

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        console.log("no user");
      }
    });
  }, []);

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
      <Button title="Login" onPress={loginUser} />
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Register"
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
