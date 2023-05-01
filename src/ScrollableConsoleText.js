import React from 'react';
import { AnsiComponent } from 'react-native-ansi-view';
import { View, ScrollView, Text } from 'react-native';

const ScrollableText = ({ text, height }) => {
  return (
    <View style={{ height }}>
      <ScrollView style={{margin:15}}>
        {text instanceof Promise ? <Text>Loading Console Output...</Text> : text.map((line) => {
            return (
        <AnsiComponent 
        containerStyle={{backgroundColor: "black"}}
        textStyle={{fontSize: 14, marginLeft: 9, fontFamily: "Monospace"}} 
        ansi={line} 
         />)
        })} 
      </ScrollView>
    </View>
  );
};

export default ScrollableText;