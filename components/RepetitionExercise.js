import * as React from "react";
import { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";

import { styles } from "../App";
export default function RepetitionExercise({ route, navigation }) {

    let [rep, setRep] = useState(0);
    const reset = useCallback(() => {
      setRep(0);
    }, [setRep]);
    const add = useCallback(() => {
      setRep((rep) => rep + 1);
    }, [setRep]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.data}>{rep}</Text>
      <View style={styles.actionButtonContainer}>
        <Button title="reset" onPress={reset} style={styles.button} buttonStyle={{ backgroundColor: "#AAAAAA" }}/>
        <Button title="+" onPress={add} style={styles.button} />
      </View>

    </SafeAreaView>
  );
}