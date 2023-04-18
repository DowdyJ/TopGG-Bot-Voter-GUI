import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const BooleanInput = ({ label, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = newValue => {
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        style={styles.checkbox}
        value={value}
        onValueChange={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    marginLeft: 16,
  },
});

export default BooleanInput;

