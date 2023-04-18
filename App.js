import React from "react";
import { StyleSheet, View, Text } from "react-native";
import UserList from "./src/UserList";
import ExistingUserList from "./src/ExistingUserList";
import SettingsSection from "./src/SettingsSection";
const App = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <View style={styles.userInput}>
            <UserList />
          </View>
        </View>
        <View style={styles.leftColumn}>
          <View style={styles.userInput}>
            <ExistingUserList />
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.settings}>
            <Text>egger2</Text>
            <SettingsSection />
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Eg wd wd wdg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  leftColumn: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  rightColumn: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  settings: {
    backgroundColor: "#eee",
    padding: 10
  },
  userInput: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10
  },
  bottomSection: {
    //flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "left"
  },
  bottomText: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default App;

