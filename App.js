import React from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import UserInput from "./src/UserInput";
import VMI from "./src/ViewModelInterface";
import ExistingUserList from "./src/ExistingUserList";
import SettingsSection from "./src/SettingsSection";
import SearchComponent from "./src/SearchComponent";
import ScrollableText from "./src/ScrollableConsoleText";
import EventHandler from "./src/EventHandler";
import StartStopButtons from "./src/StartStopButtons";

const App = () => {
  VMI.Init();
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
        <SearchComponent eventEmitter={EventHandler.Instance()} />
      </View>
      <View style={styles.leftColumn}>
        <View style={styles.userInput}>
          <UserInput eventEmitter={EventHandler.Instance()}/>
        </View>
      </View>
      <View style={styles.leftColumn}>
        <View style={styles.userInput}>
          <ExistingUserList updateEmitter={EventHandler.Instance()}/>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.settings}>
          <SettingsSection eventHandler={EventHandler.Instance()} />
          <TouchableOpacity style={styles.settingsButtons} onPress={() => VMI.WriteSettings()}>
            <Text style={styles.buttonText}>Apply Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButtons} onPress={() => VMI.PrintSettings()}>
            <Text style={styles.buttonText}>Print Settings</Text>
          </TouchableOpacity>
        </View>
        <View>
          <StartStopButtons />
        </View>
      </View>
    </View>);
};

function lowerSection() {
  return (
    <View style={styles.lowerContainer}>
      <Text style={styles.bottomText}>Output</Text>
      <View style={styles.consoleContainer}>
        <ScrollableText height={150}/>
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
    maxHeight: screenHeight * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  outerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  upperContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  consoleContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
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

    backgroundColor: "white",
    alignItems: "stretch"
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
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5
  }
});

export default App;

