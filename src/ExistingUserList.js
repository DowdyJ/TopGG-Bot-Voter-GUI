import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  users = ["bill", "jame"];
  const handleUserPress = (user) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleRemoveUser = () => {
    if (selectedUser) {
      console.log(`Removing user ${selectedUser}`);
      // TODO: Remove selected user from list
      setSelectedUser(null);
    }
  };

  const renderUser = (user) => {
    const isSelected = user === selectedUser;
    return (
      <TouchableOpacity
        key={user}
        style={[
          styles.userContainer,
          isSelected && { backgroundColor: "blue" }
        ]}
        onPress={() => handleUserPress(user)}
      >
        <Text style={styles.userText}>{user}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveUser}
          disabled={!isSelected}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Registered Users</Text>
      {users && users.map(renderUser)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center"
  },
  userText: {
    fontSize: 16,
    flex: 1
  },
  removeButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    marginLeft: 10
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default UserList;

