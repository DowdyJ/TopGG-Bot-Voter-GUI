import React from 'react';
import { View, ScrollView, Text } from 'react-native';

const ScrollableText = ({ text, height }) => {
  return (
    <View style={{ height }}>
      <ScrollView style={{margin:15}}>
        <Text style={{fontSize: 14, fontFamily: "Monospace"}}>{text}</Text>
      </ScrollView>
    </View>
  );
};

export default ScrollableText;