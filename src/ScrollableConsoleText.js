import React from 'react';
import { AnsiComponent } from 'react-native-ansi-view';
import { View, ScrollView, Text } from 'react-native';

const ScrollableText = ({ text, height }) => {
    console.log(text)
  return (
    <View style={{ height }}>
      <ScrollView style={{margin:15}}>
        {text.map((line) => {
            return (
        <AnsiComponent 
        containerStyle={{backgroundColor: "black"}}
        textStyle={{fontSize: 14, marginLeft: 9}} 
        ansi={line} 
         />)
        })} 
      </ScrollView>
    </View>
  );
};

export default ScrollableText;

/*
{text.map((line, index) => {
    <AnsiComponent 
    containerStyle={{backgroundColor: "black"}}
    textStyle={{fontSize: 14}} 
    ansi={line} 
    key={index} />
})}*/