import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const NumberInput = () => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChangeText = (text) => {
    const isNumber = /^\d+$/.test(text);
    setIsValid(isNumber);
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          keyboardType="numeric"
        />
      </View>
      {!isValid && <Text style={styles.errorText}>Input must be a number</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10
  },
  input: {
    fontSize: 18
  },
  errorText: {
    color: "red",
    marginTop: 5
  },

  inputContainerFocused: {
    borderColor: "#007AFF",
    borderWidth: 2
  }
});

export default NumberInput;

