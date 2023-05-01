import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import VMI from "./ViewModelInterface";

const UserList = ({ updateEmitter }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userListDirty, setUserListDirty] = useState(true);

  updateEmitter.on("updateUserList", () => {
    setUserListDirty(true);
  });

  const handleUserPress = (user) => {
    setSelectedUser((prevSelectedUser) => (prevSelectedUser === user ? null : user));
  };

  const handleRemoveUser = (user) => {
    if (selectedUser) {
      VMI.RemoveUser(user);
      console.log(`Removing user ${selectedUser}`);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    if (userListDirty) {
      console.log("Setting new userlist");
      VMI.GetUserList().then((users) => {
        setUserList(users);
        setUserListDirty(false);
      });
    } else {
      const components = userList.map(renderUser);
    }
  }, [userListDirty, userList]);

  const renderUser = (user) => {
    const isSelected = user === selectedUser;

    return (
      <TouchableOpacity
        key={user.username}
        style={[styles.userContainer, isSelected && { backgroundColor: "#D3D3D3" }]}
        onPress={() => handleUserPress(user)}
      >
        <Text style={styles.userText}>{user.username}</Text>
        {isSelected && (
          <>
            <Text style={styles.userTextDetails}>
              Will vote for {user.botsToVoteFor.map((bot) => bot.botName).join(", ")}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveUser(user)}
              disabled={!isSelected}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Registered Users</Text>
      {userList.length > 0 ? userList.map(renderUser) : <Text>Loading Users...</Text>}
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
  userTextDetails: {
    fontSize: 12,
    fontWeight:"500",
    color: "gray",
    fontStyle: "italic",
    flex: 1
  },
  removeButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 10
  },
  removeButtonText: {
    color: "black",
    fontWeight: "bold"
  }
});

export default UserList;

