import { React, useState, useEffect } from 'react';
import { AnsiComponent } from 'react-native-ansi-view';
import { View, ScrollView, Text } from 'react-native';
import VMI from './ViewModelInterface';
import EventHandler from './EventHandler';


const ScrollableText = ({ height }) => {
  const [text, setText] = useState([])

  useEffect(() => {
    EventHandler.Instance().on("updateOutputText", () => {
      VMI.GetOutputText().then((result) => {
        setText(result.splice(-100));
      }).catch((err) => {
        console.log(`ERROR. Failed to set output from GetOutputText. Details: ${err}`);
      })
    })
  }, [])

  let keyIndex = 0;

  return (
    <View style={{ height: height }}>
      <ScrollView style={{margin:15}}>
        {text.map((line) => {
            return (
        <AnsiComponent 
        containerStyle={{backgroundColor: "black"}}
        textStyle={{fontSize: 14, marginLeft: 9, color: "white", fontFamily: "Monospace"}} 
        ansi={typeof(line) === 'string' ? line : "   "}
        key={keyIndex++}
         />)
        })} 
      </ScrollView>
    </View>
  );
};

export default ScrollableText;