import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import StringInput from "./StringInput";

const UserInput = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bots, setBots] = useState("");

  const addUser = () => {
    // Add logic to save user details to a list
    console.log(
      `Adding user: ${username} with password ${password}, email ${email} and ${bots} bots`
    );
  };

  const isDisabled =
    username.trim() === "" || password.trim() === "" || email.trim() === "";

  return (
    <View style={styles.container}>
      <StringInput label="Username" value={username} onChange={setUsername} />
      <StringInput label="Password" value={password} onChange={setPassword} />
      <StringInput label="Email" value={email} onChange={setEmail} />
      <StringInput label="Bots" value={bots} onChange={setBots} />
      <Button title="Add User" onPress={addUser} disabled={isDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10
  }
});

export default UserInput;

