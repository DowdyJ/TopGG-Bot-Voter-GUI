import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import StringInput from "./StringInput";
import VMI from "./ViewModelInterface";
import User from "./User";
import MultiSelectList from "./MultiSelectList";

const UserInput = ({eventEmitter}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bots, setBots] = useState([]);
  

  const addUser = () => {
    if (!isDisabled) {
      VMI.AddUser(new User(username, password, email, bots));
      eventEmitter.emit('updateUserList')
    }
  };

  const isDisabled =
    username.trim() === "" || password.trim() === "" || email.trim() === "" || bots.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add User</Text>
      <StringInput label="Username" value={username} onChange={setUsername} isValid={() => username !== ""} placeholder="Your Discord username (e.g. DoeJ)" />
      <StringInput label="Password" value={password} onChange={setPassword} isValid={() => password !== ""} placeholder="Your Discord password" />
      <StringInput label="Email" value={email} onChange={setEmail} isValid={() => email !== ""} placeholder="The email you use with Discord"/>
      <Text style={styles.label}>Bots:</Text> 
      <MultiSelectList setSelectedBots={setBots} eventEmitter={eventEmitter}/>
      <Button title="Add User" onPress={addUser} disabled={isDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "normal",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  container: {
    backgroundColor: "white",
    padding: 10
  }
});

export default UserInput;

