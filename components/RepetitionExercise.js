import * as React from "react";
import { useState, useCallback, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "./Popup";

export default function RepetitionExercise({ route, navigation }) {
  let [rep, setRep] = useState(0);

  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(true);
  let [cal, setCal] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let [showConfirmation, setShowConfirmation] = useState(false);

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
    let timeInterval = setTimeout(updateTime, 100);
    return () => clearInterval(timeInterval);
  });
  useEffect(() => {
    const calc =
      ((route.params.met * 3.5 * (route.params.weight * 0.45359237)) / 200) *
        0.017 *
        sec +
      cal;
    setCal(calc);
  }, [rep]);

  const reset = useCallback(() => {
    setRep(0);
  }, [setRep]);
  const add = useCallback(() => {
    setRep((rep) => rep + 1);
  }, [setRep]);

  const goBack = async () => {
    const data = {
      name: route.params.title,
      caloriesBurned: cal.toFixed(2),
      date: Date.now(),
      timeElapsed: totalTime,
    };
    let cpy = route.params.history;
    cpy.push(data);
    try {
      await AsyncStorage.setItem("@history", JSON.stringify(cpy));
    } catch (err) {
      console.error(err);
    }
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: 50 }]}>
      {showConfirmation && (
        <Popup
          actionFunction={goBack}
          setShowConfirmation={setShowConfirmation}
          message="Go back?"
          confirmButtonColor="#D86B6B"
        />
      )}
      <View>
        <TouchableOpacity
          onPress={() => {
            setRunning(false);
            setShowConfirmation(true);
          }}
          style={{ zIndex: 3, position: "absolute" }}
        >
          <IoIosArrowBack size={40} />
        </TouchableOpacity>

        <View style={{ width: "100%" }}>
          <Text style={[styles.heading2, { textAlign: "center" }]}>
            {route.params.title}
          </Text>
        </View>
      </View>
      <Text style={styles.data}>{rep}</Text>
      <Text style={styles.data}>
        {min}:{sec}:{mil}
      </Text>
      {route.params.weight && (
        <Text style={{ color: "white", textAlign: "center" }}>
          Calories Burned: {cal.toFixed(2)}
        </Text>
      )}
      <View style={styles.actionButtonContainer}>
        <Button
          title="reset"
          onPress={reset}
          style={styles.button}
          buttonStyle={{ backgroundColor: "#AAAAAA" }}
        />
        <Button title="+" onPress={add} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}
