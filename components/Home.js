import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "../App";
import { Button } from "react-native-elements";
import { FiSettings } from "react-icons/fi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { ProgressBar } from "react-native-paper";

export default function Home({ navigation }) {
  const exercises = require("./exercises.json");
  const isFocused = useIsFocused();
  //get user data from local storage when component loads
  let [userInfo, setUserInfo] = useState("");
  let [plans, setPlans] = useState([]);
  let [history, setHistory] = useState([]);
  let [calProgress, setCalProgress] = useState(0);
  let [timeProgress, setTimeProgress] = useState(0);
  const dateToString = (timeStamp) => {
    const date = new Date(timeStamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  useEffect(() => {
    async function getUserInfo() {
      try {
        const getUser = await AsyncStorage.getItem("@userInfo");
        getUser && setUserInfo(JSON.parse(getUser));

        const getPlan = await AsyncStorage.getItem("@plans");
        getPlan && setPlans(JSON.parse(getPlan));

        const getHistory = await AsyncStorage.getItem("@history");
        getHistory && setHistory(JSON.parse(getHistory));
      } catch (err) {
        console.error(err);
      }
    }
    getUserInfo();
  }, [isFocused]);
  useEffect(() => {
    const today = dateToString(new Date());
    if (userInfo.calorieGoal && history.length) {
      const sum = history.reduce((accumulator, currentValue) => {
        if (dateToString(currentValue.date) == today) {
          return accumulator + currentValue.caloriesBurned;
        }
        return accumulator;
      }, 0);
      setCalProgress(Math.round(sum));
    }
    if (userInfo.timeGoal && history.length) {
      const sum = history.reduce((accumulator, currentValue) => {
        if (dateToString(currentValue.date) == today) {
          return accumulator + currentValue.timeElapsed / 100;
        }
        return accumulator;
      }, 0);
      setTimeProgress(Math.round(sum / 60));
    }
  }, [userInfo]);
  const renderItem = ({ item }) => {
    return (
      <>
        <Button
          title={item.name}
          buttonStyle={styles.activities}
          onPress={() =>
            navigation.navigate(item.type, {
              ...item,
              weight: userInfo.weight ? userInfo.weight : 0,
              history,
            })
          }
        ></Button>
      </>
    );
  };
  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: 50 }]}>
      <View style={styles.row}>
        <Text style={styles.title}>
          <Text style={{ color: "#8F8EE1" }}>Buddy</Text>Workout
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <FiSettings color="white" size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.smallBox}>
        <Text style={styles.normalText}>Daily Goal</Text>
        {userInfo.calorieGoal || userInfo.timeGoal ? (
          <>
            <View style={styles.row}>
              <ProgressBar
                progress={calProgress / userInfo.calorieGoal}
                color={"#5957ff"}
                visible={userInfo.calorieGoal}
                style={{ width: 200, height: 10, borderRadius: 10 }}
              />
              <Text style={styles.normalText}>
                {userInfo.calorieGoal &&
                  `${calProgress} / ${userInfo.calorieGoal} cal`}
              </Text>
            </View>
            <View style={styles.row}>
              <ProgressBar
                progress={timeProgress / userInfo.timeGoal}
                color={"#5957ff"}
                visible={userInfo.timeGoal}
                style={{ width: 200, height: 10, borderRadius: 10 }}
              />
              <Text style={styles.normalText}>
                {userInfo.timeGoal &&
                  `${timeProgress} / ${userInfo.timeGoal} min`}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.normalText}>
            No goals set. go into settings to set a goal.
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("History", { history });
        }}
      >
        <Text
          style={[styles.normalText, { color: "#9A9CD0", textAlign: "center" }]}
        >
          View History
        </Text>
      </TouchableOpacity>

      <Text style={[styles.heading2, { marginTop: 40 }]}>
        Start an activity
      </Text>
      <View style={styles.activitiesContainer}>
        <FlatList
          numColumns={2}
          data={exercises}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
