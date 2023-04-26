import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

const StringInput = ({ label, value, onChange, isValid, placeholder, style }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputContainerFocused : null,
        ]}
      >
        <TextInput
          style={value ? styles.input : styles.inputQuiet}
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          keyboardType="default"
        />
      </View>
      {!isValid && (
        <Text style={styles.errorText}>{label} cannot be empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  quietText: {
    fontStyle: "italic",
    color: "gray",
    fontSize: 14
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    padding: 8
  },
  inputContainerFocused: {
    borderColor: "#007AFF",
    borderWidth: 2
  },
  inputContainerInvalid: {
    borderColor: "#FF3B30"
  },
  input: {
    color: "black",
    fontStyle: "normal",
    fontSize: 14
  },
  inputQuiet: {
    color: "gray",
    fontStyle: "italic",
    fontSize: 12
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4
  }
});

export default StringInput;

