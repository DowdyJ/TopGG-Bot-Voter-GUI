import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import UserInput from "./src/UserInput";
import VMI from "./src/ViewModelInterface";
import ExistingUserList from "./src/ExistingUserList";
import SettingsSection from "./src/SettingsSection";
import { EventEmitter } from 'events';
import SearchComponent from "./src/SearchComponent";

let eventEmitter = new EventEmitter();

const App = () => {
  return (
    <View style={styles.appContainer}>
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View>
          <SearchComponent eventEmitter={eventEmitter} />
        </View>
        <View style={styles.leftColumn}>
          <View style={styles.userInput}>
            <UserInput eventEmitter={eventEmitter}/>
          </View>
        </View>
        <View style={styles.leftColumn}>
          <View style={styles.userInput}>
            <ExistingUserList updateEmitter={eventEmitter}/>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.settings}>
            <SettingsSection eventHandler={eventEmitter} />
          </View>
          <Button onPress={() => eventEmitter.emit("applySettings")}>Apply Settings</Button>
          <Button onPress={() => VMI.PrintSettings()}>Apply Settings</Button>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Console Text Eventually!</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  outerContainer: {
    flex: 1,
    flexDirection: "column",
  },
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

