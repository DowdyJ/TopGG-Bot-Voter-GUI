import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import VMI from './ViewModelInterface'
import EventHandler from './EventHandler';

const StartStopButtons = () => {
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      EventHandler.Instance().on("updateIsRunning", () => {
        VMI.GetIsRunning().then((isRunning) => {
            setIsRunning(isRunning);
        })
    })
    }, []);

    return (<>
        <TouchableOpacity disabled={!isRunning} style={isRunning ? styles.stopButton : styles.mainButtonDisabled} onPress={() => VMI.PrintSettings()}>
            <Text style={styles.startButtonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isRunning} style={isRunning ? styles.mainButtonDisabled : styles.startButton} onPress={() => VMI.StartVote()}>
            <Text style={styles.startButtonText}>Start Voter</Text>
        </TouchableOpacity>
    </>)
};



const styles = StyleSheet.create({
    startButton: {
        backgroundColor: '#68C668',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 10,
      },
      stopButton: {
        backgroundColor: '#C76969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 10,
      },
      mainButtonDisabled: {
        backgroundColor: '#dfdfdf',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 10,
      },
      startButtonText: {
        fontSize: 14,
        color: "white",
        fontStyle: "normal",
        fontWeight: "bold"
      },
  });
  
  export default StartStopButtons;