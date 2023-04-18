import { React, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StringInput from './StringInput';
import BooleanInput from './BooleanInput'

const SettingsSection = () => {
  const [formValues, setFormValues] = useState({
    field1: "test",
    field2: "test2",
    repeatVote: false,
    useRealScreen: true
  });

  const handleInputChange = (fieldName, text) => {
    setFormValues({
      ...formValues,
      [fieldName]: text
    });
  };

  const fields = [
    {
      name: "field1",
      label: "Discord Username",
      type: "string"
    },
    {
      name: "field2",
      label: "2Captcha API Key (optional)",
      type: "string"
    },
    {
      name: "repeatVote",
      label: "Should repeat vote?",
      type: "boolean"
    },
    {
      name: "useRealScreen",
      label: "Use real screen?",
      type: "boolean"
    }
  ];

    return (
      <>
        {fields.map((field) => {
          if (field.type === "string") {
            return (
              <StringInput
                key={field.name}
                label={field.label}
                value={formValues[field.name]}
                onChange={(text) => handleInputChange(field.name, text)}
                isValid={true}
              />
            );
          } else if (field.type === "boolean") {
            return (
              <BooleanInput
                key={field.name}
                label={field.label}
                value={formValues[field.name]}
                onChange={(text) => handleInputChange(field.name, text)}
                isValid={true}
              />
            );
          } else {
          }
        })}
      <Text>Field 1 value: {formValues.field1}</Text>
      <Text>Field 2 value: {formValues.field2}</Text>
    </>
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

