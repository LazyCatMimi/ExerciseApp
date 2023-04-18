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
import { Button, CheckBox, Input } from "react-native-elements";
import { IoIosArrowBack } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { styles } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "./Popup";

let timeInterval = null;
export default function RepetitionExercise({ route, navigation }) {
  const popupMessages = {
    back: {
      actionFunction: () => goBack(),
      setShowConfirmation: () => setShowConfirmation(),
      message: "Go back?",
      confirmButtonColor: "#2089DC",
    },
    goalAchieved: {
      cancelFunction: () => reset(),
      actionFunction: () => dontReset(),
      setShowConfirmation: () => setShowConfirmation(),
      message: "You have achieved your rep goal!",
      cancelMessage: "Reset and continue",
      confirmMessage: "Don't reset and continue",
      confirmButtonColor: "#2089DC",
    },
  };
  // states for basic functions
  let [rep, setRep] = useState(0);
  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(false);
  let [cal, setCal] = useState(0);
  let [totalCal, setTotalCal] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let [totalRep, setTotalRep] = useState(0);
  let [showConfirmation, setShowConfirmation] = useState(false);

  // states for goal
  let [checked, setChecked] = useState(false);
  let [goal, setGoal] = useState("");
  let [goalErr, setGoalErr] = useState("");
  let [cachedGoal, setCachedGoal] = useState("");
  let [icon, setIcon] = useState(false);
  let [popupProps, setPopupProps] = useState(popupMessages.back);

  // each part of the timer
  let min = Math.floor((time / (100 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor((time / 100) % 60)
    .toString()
    .padStart(2, "0");

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
  useEffect(() => {
    // calculate based on how much calories burned per sec * how many seconds have passed
    const calc =
      ((route.params.met * 3.5 * (route.params.weight * 0.45359237)) / 200) *
      0.017 *
      (Number(sec) + 59 * Number(min));
    setCal(calc);
  }, [rep]);

  const reset = useCallback(() => {
    setRep(0);
    setTotalTime(totalTime + time);
    setTotalCal(totalCal + cal);
    setTotalRep(totalRep + rep);
    setTime(0);
    setCal(0);
    clearInterval(timeInterval);
    setRunning(false);
  });
  const add = useCallback(() => {
    if (!running) {
      setRunning(true);
      clearInterval(timeInterval);
    }
    setRep(rep + 1);
    if (cachedGoal && rep + 1 == cachedGoal) {
      setPopupProps(popupMessages.goalAchieved);
      setShowConfirmation(true);
    }
  });

  const checkGoalInput = (value) => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(value) || value.length == 0) {
      setGoalErr("");
    } else {
      setGoalErr("Please enter only numbers.");
    }
    if (value != cachedGoal) {
      setIcon(false);
    } else {
      setIcon(true);
    }
  };

  const goBack = async () => {
    if (cal > 0 || totalCal > 0) {
      const data = {
        name: route.params.name,
        type: route.params.type,
        reps: totalRep,
        caloriesBurned: totalCal,
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
    }
    navigation.navigate("Home");
  };
  const dontReset = () => {
    setChecked(false);
    setCachedGoal("");
    setGoal("");
    setIcon(false);
  };
  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: 50 }]}>
      {showConfirmation && <Popup {...popupProps} />}
      <View>
        <TouchableOpacity
          onPress={() => {
            setRunning(false);
            setPopupProps(popupMessages.back);
            setShowConfirmation(true);
          }}
          style={{ zIndex: 3, position: "absolute" }}
        >
          <IoIosArrowBack size={40} />
        </TouchableOpacity>

        <View style={{ width: "100%" }}>
          <Text style={[styles.heading2, { textAlign: "center" }]}>
            {route.params.name}
          </Text>
        </View>
      </View>
      <Text style={styles.data}>{rep}</Text>
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
          buttonStyle={{ backgroundColor: "#33383F" }}
        />
        <Button title="+" onPress={add} style={styles.button} />
      </View>

      <CheckBox
        title="set goal"
        center
        checked={checked}
        onPress={() => setChecked(!checked)}
        containerStyle={{ margin: 0, backgroundColor: "none", border: "none" }}
        textStyle={{ color: "white" }}
      />
      {checked && (
        <>
          <Input
            placeholder="reps"
            label="Set a goal for the amount of reps you want to achieve in this session."
            value={goal}
            errorMessage={goalErr}
            onChangeText={(value) => {
              setGoal(value);
              checkGoalInput(value);
            }}
            style={styles.inputs.basic}
          />
          <Button
            title="set"
            icon={icon && <BsCheck color="green" size={20} />}
            // disable if theres an error, no input, or input==cached input
            disabled={
              goalErr.length != 0 || goal.length == 0 || goal == cachedGoal
            }
            onPress={() => {
              setCachedGoal(goal);
              setIcon(true);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}
