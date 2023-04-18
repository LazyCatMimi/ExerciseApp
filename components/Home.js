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

export default function Home({ navigation }) {
  const exercises = require("./exercises.json");
  const isFocused = useIsFocused();
  //get user data from local storage when component loads
  let [userInfo, setUserInfo] = useState("");
  let [plans, setPlans] = useState([]);
  let [history, setHistory] = useState([]);
  let [calProgress, setCalProgress] = useState(0);
  let [timeProgress, setTimeProgress] = useState(0);

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
    if (userInfo.calorieGoal && history.length > 0) {
      const sum = history.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.caloriesBurned;
      }, 0);
      setCalProgress(Math.ceil(sum));
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
              weight: userInfo.weight,
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
        <Text style={styles.title}>BuddyWorkout</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <FiSettings color="white" size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.smallBox}>
        <Text style={styles.normalText}>Daily Goal</Text>
        {userInfo.calorieGoal || userInfo.timeGoal ? (
          <>
            <Text style={styles.normalText}>
              {userInfo.calorieGoal &&
                `${calProgress} / ${userInfo.calorieGoal} cal`}
            </Text>
            <Text style={styles.normalText}>
              {userInfo.timeGoal &&
                `${timeProgress} / ${userInfo.timeGoal} cal`}
            </Text>
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
      {/* <View style={styles.row}>
        <Text style={[styles.heading2, { marginTop: 40 }]}>Workout Plans</Text>
        <Text style={styles.normalText}>{plans.length}/5</Text>
      </View>
      <TouchableOpacity
        style={{ textAlign: "center" }}
        onPress={() =>
          navigation.navigate("Plan Edit", { exercises: exercises })
        }
      >
        <Text style={styles.normalText}>New Plan</Text>
      </TouchableOpacity> */}

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
