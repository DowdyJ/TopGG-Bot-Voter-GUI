import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import StringInput from "./StringInput";
import VMI from "./ViewModelInterface";
import User from "./User";
import MultiSelectList from "./MultiSelectList";

const UserInput = ({eventEmitter}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bots, setBots] = useState([]);

  const [dummy, setDummy] = useState(false);
  eventEmitter.on("updateRegisteredBotList", () => {setDummy(!dummy)});
  
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
      <StringInput label="Username" value={username} onChange={setUsername} isValid={() => username !== ""} />
      <StringInput label="Password" value={password} onChange={setPassword} isValid={() => password !== ""} />
      <StringInput label="Email" value={email} onChange={setEmail} isValid={() => email !== ""} />
      <MultiSelectList setSelectedBots={setBots} eventEmitter={eventEmitter}/>
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

