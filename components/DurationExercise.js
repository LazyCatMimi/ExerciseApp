import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {Button} from "react-native-elements"
import { styles } from "../App";

let timeInterval = null;
export default function DurationExercise({ route, navigation }) {
  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(false);
  // stop watch from instructor video with permission
  // each part of the timer
  let min = Math.floor((time / (100 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor((time / 100) % 60)
    .toString()
    .padStart(2, "0");
  let mil = (time % 100).toString().padStart(2, "0");

  // update time
  let updateTime = useCallback(() => {
    if (running) {
      setTime((time) => time + 11);
    }
  }, [running]);

  useEffect(() => {
    timeInterval = setTimeout(updateTime, 100);
    return () => clearInterval(timeInterval);
  });

  // button usecallbacks
  const stopStart = useCallback(() => {
    setRunning(!running);
    clearInterval(timeInterval);
  }, [running]);

  const reset = useCallback(() => {
    setTime(0);
    clearInterval(timeInterval);
    setRunning(false);
  }, [setRunning]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.data}>
        {min}:{sec}:{mil}
      </Text>
      <View style={styles.actionButtonContainer}>
        <Button 
        title="reset" 
        onPress={reset} 
        style={styles.button} 
        buttonStyle={{ backgroundColor: "#AAAAAA" }}
        />
        <Button
          title={running ? "stop" : "start"}
          onPress={stopStart}
          style={styles.button}
          buttonStyle={{ backgroundColor: running? "#AA1010" : "#10AA10"}}
        />
      </View>
    </SafeAreaView>
  );
}