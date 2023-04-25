import { React, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StringInput from './StringInput';
import BooleanInput from './BooleanInput'
import VMI from './ViewModelInterface';

const SettingsSection = ({eventHandler}) => {
  const [formValues, setFormValues] = useState({
    twoCaptchaAPIKey: "(your api key here)",
    repeatVote: false,
    useRealScreen: true
  });

  const handleInputChange = (fieldName, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value
    });
  };

  const applySettings = () => {
    VMI.SetSetting("twocaptchaAPIKey", formValues["twoCaptchaAPIKey"]);
    VMI.SetSetting("real_screen", formValues["useRealScreen"] ? "TRUE" : "FALSE");
    VMI.SetSetting("autoloop", formValues["repeatVote"] ? "TRUE" : "FALSE");
  }

  eventHandler.on("applySettings", () => applySettings());

  const fields = [
    {
      name: "twoCaptchaAPIKey",
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
                initialValue={formValues[field.name]}
                value={formValues[field.name]}
                onChange={(text) => handleInputChange(field.name, text)}
                isValid={true}
              />
            );
          } else {
          }
        })}
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

