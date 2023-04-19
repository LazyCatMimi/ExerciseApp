import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { styles } from "../App";
import { IoIosArrowBack } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Popup from "./Popup";

let timeInterval = null;
export default function DurationExercise({ route, navigation }) {
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
      message: "You have achieved your time goal!",
      cancelMessage: "Reset and continue",
      confirmMessage: "Don't reset and continue",
      confirmButtonColor: "#2089DC",
    },
  };
  const initGoal = {
    min: "",
    sec: "",
  };
  // states for basic functions
  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(false);
  let [cal, setCal] = useState(0);
  let [totalCal, setTotalCal] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let [showConfirmation, setShowConfirmation] = useState(false);

  // states for goal
  let [checked, setChecked] = useState(false);
  let [goal, setGoal] = useState(initGoal);
  let [goalErr, setGoalErr] = useState(initGoal);
  let [cachedGoal, setCachedGoal] = useState(initGoal);
  let [icon, setIcon] = useState(false);
  let [popupProps, setPopupProps] = useState(popupMessages.back);
  let [disabled, setDisabled] = useState(false);

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
      setTime((time) => time + 12);
      const calc =
        ((route.params.met * 3.5 * (route.params.weight * 0.45359237)) / 200) *
          0.017 +
        cal;
      setCal(calc);
    }
  }, [running, sec]);

  // check to see if goal is met.
  useEffect(() => {
    if (
      cachedGoal.min &&
      cachedGoal.min == parseInt(min) &&
      parseInt(sec) >= cachedGoal.sec
    ) {
      setRunning(false);
      setPopupProps(popupMessages.goalAchieved);
      setShowConfirmation(true);
    }
  }, [cachedGoal, sec, min]);

  useEffect(() => {
    timeInterval = setTimeout(updateTime, 100);
    return () => clearInterval(timeInterval);
  });

  // button usecallbacks
  const stopStart = useCallback(() => {
    setRunning(!running);
    clearInterval(timeInterval);
  });

  const reset = useCallback(() => {
    setTotalTime(totalTime + time);
    setTotalCal(totalCal + cal);
    setTime(0);
    setCal(0);
    clearInterval(timeInterval);
    setRunning(false);
  });

  const goBack = async () => {
    if (cal > 0 || totalCal > 0) {
      const data = {
        name: route.params.name,
        type: route.params.type,
        caloriesBurned: totalCal + cal,
        date: Date.now(),
        timeElapsed: totalTime + time,
      };
      let cpy = route.params.history;
      cpy = [data, ...cpy];
      try {
        await AsyncStorage.setItem("@history", JSON.stringify(cpy));
      } catch (err) {
        console.error(err);
      }
    }
    navigation.navigate("Home");
  };
  const checkGoalInput = (value, type) => {
    setDisabled(false);
    const regex = /^[0-9\b]+$/;
    if (type == "sec" && value > 59) {
      setGoalErr({ ...goalErr, [type]: "Seconds cannot exceed 59" });
    } else if (regex.test(value) || !value) {
      setGoalErr({ ...goalErr, [type]: "" });
    } else {
      setGoalErr({ ...goalErr, [type]: "Please enter only numbers." });
    }
    // set checked icon hidden for button if userInput is not equal to saved goal and if there's no input
    if (value != cachedGoal[type] || !value) {
      setIcon(false);
    } else {
      setIcon(true);
    }
  };
  const dontReset = () => {
    setChecked(false);
    setCachedGoal(initGoal);
    setGoal(initGoal);
    setIcon(false);
  };

  return (
    <>
      <SafeAreaView style={[styles.container, { paddingHorizontal: 50 }]}>
        {showConfirmation && <Popup {...popupProps} />}
        <View>
          <TouchableOpacity
            onPress={() => {
              if (totalTime + time == 0) {
                navigation.navigate("Home");
              }
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
        <Text style={styles.data}>
          {min}:{sec}.{mil}
        </Text>
        {route.params.weight.length ? (
          <Text style={{ color: "white", textAlign: "center" }}>
            Calories Burned: {cal.toFixed(2)}
          </Text>
        ) : undefined}
        <View style={styles.actionButtonContainer}>
          <Button
            title="reset"
            onPress={reset}
            style={styles.button}
            buttonStyle={{ backgroundColor: "#33383F" }}
          />
          <Button
            title={running ? "stop" : "start"}
            onPress={stopStart}
            style={styles.button}
            buttonStyle={{ backgroundColor: running ? "#AA1010" : "#5EB450" }}
          />
        </View>
        <CheckBox
          title="set goal"
          center
          checked={checked}
          onPress={() => {
            setChecked(!checked);
            setGoal(initGoal);
            setGoalErr(initGoal);
            setCachedGoal(initGoal);
            setIcon(false);
          }}
          containerStyle={{
            margin: 0,
            backgroundColor: "none",
            border: "none",
          }}
          textStyle={{ color: "white" }}
        />
        {checked && (
          <>
            <Input
              placeholder="min"
              label="Set a goal for the amount of time you want to achieve in this session."
              value={goal.min}
              errorMessage={goalErr.min}
              onChangeText={(value) => {
                setGoal({ ...goal, min: value });
                checkGoalInput(value, "min");
              }}
              style={styles.inputs.basic}
            />
            <Input
              placeholder="sec"
              value={goal.sec}
              errorMessage={goalErr.sec}
              onChangeText={(value) => {
                setGoal({ ...goal, sec: value });
                checkGoalInput(value, "sec");
              }}
              style={styles.inputs.basic}
            />
            <Button
              title="set"
              icon={icon && <BsCheck color="green" size={20} />}
              // disable if theres an error, no input, or input==cached input
              disabled={
                goalErr.min.length ||
                goalErr.sec.length ||
                (!goal.min && !goal.sec) ||
                (goal.min === cachedGoal.min && goal.sec === cachedGoal.sec) ||
                disabled
              }
              onPress={() => {
                let cpy = goal;
                if (!goal.min) {
                  cpy.min = 0;
                }
                if (!goal.sec) {
                  cpy.sec = 0;
                }
                setGoal({ ...cpy });
                setCachedGoal({ ...cpy });
                setIcon(true);
                setDisabled(true);
              }}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
}
