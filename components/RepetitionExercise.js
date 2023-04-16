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
import { IoIosArrowBack } from "react-icons/io";
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
    <SafeAreaView style={[styles.container, {paddingHorizontal:50}]}>
       <View>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{zIndex:3, position:"absolute"}}>
              <IoIosArrowBack size={40}/>
          </TouchableOpacity>

          <View style={{width:"100%"}}>
              <Text style={[styles.heading2, {textAlign:"center"}]}>{route.params.title}</Text>
          </View>
        </View>
      <Text style={styles.data}>{rep}</Text>
      <View style={styles.actionButtonContainer}>
        <Button title="reset" onPress={reset} style={styles.button} buttonStyle={{ backgroundColor: "#AAAAAA" }}/>
        <Button title="+" onPress={add} style={styles.button} />
      </View>

    </SafeAreaView>
  );
}