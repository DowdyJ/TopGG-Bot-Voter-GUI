import React from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import UserInput from "./src/UserInput";
import VMI from "./src/ViewModelInterface";
import ExistingUserList from "./src/ExistingUserList";
import SettingsSection from "./src/SettingsSection";
import { EventEmitter } from 'events';
import SearchComponent from "./src/SearchComponent";

let eventEmitter = new EventEmitter();

const App = () => {
  return (
    wholeAppScreen()
  );
};


function wholeAppScreen() {
  return (    
  <View style={styles.appContainer}>
    <View style={styles.outerContainer}>
      <View>
        {upperSection()}
      </View>
        {lowerSection()}
    </View>
  </View>
    );
};

function upperSection() {
  return (
    <View style={styles.upperContainer}>
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
          <TouchableOpacity style={styles.settingsButtons} onPress={() => eventEmitter.emit("applySettings")}>
            <Text style={styles.buttonText}>Apply Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButtons} onPress={() => VMI.PrintSettings()}>
            <Text style={styles.buttonText}>Print Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
};

function lowerSection() {
  return (
    <View style={styles.lowerContainer}>
      <Text style={styles.bottomText}>Output</Text>
      <View style={styles.consoleContainer}>

      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  appContainer: {
    borderWidth: 2,
    borderColor: "gray",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    maxHeight: screenHeight * 0.9
  },
  outerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  upperContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "stretch"

  },
  consoleContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    marginVertical: 10,
    marginHorizontal: 10
  },
  settingsButtons: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontStyle: "italic",
    fontWeight: "normal"
  },
  lowerContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ccc",
    alignItems: "stretch"

    //alignItems: "center",
    //justifyContent: "left"
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
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    margin: 10
  },
  userInput: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10
  },
  bottomText: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default App;

