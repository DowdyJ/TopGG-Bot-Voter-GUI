import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsSection = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Settings</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
});

export default SettingsSection;

