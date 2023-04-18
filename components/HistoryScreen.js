import { Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TouchableOpacity } from "react-native-web";

export default function HistoryScreen({ route, navigation }) {
  const history = route.params.history;
  const dateToString = (timeStamp) => {
    const date = new Date(timeStamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const timeToString = (timeStamp) => {
    const date = new Date(timeStamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };
  // let [dateDiff, setDateDiff] = useState(false);
  let [heading, setHeading] = useState(
    history.length ? dateToString(history[0].date) : ""
  );
  // console.log(dateToString(history[0].date));

  const renderItem = ({ item, index }) => {
    let dateDiff = false;
    const itemDate = dateToString(item.date);
    const min = Math.floor((item.timeElapsed / (100 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor((item.timeElapsed / 100) % 60)
      .toString()
      .padStart(2, "0");
    if (
      (history[index - 1] &&
        dateToString(history[index - 1].date) != itemDate) ||
      index == 0
    ) {
      dateDiff = true;
    }
    return (
      <>
        {/* date heading */}
        {dateDiff && (
          <Text style={[styles.normalText, { marginTop: 30 }]}>{itemDate}</Text>
        )}
        {/* exercise name and time */}
        <View style={[styles.smallBox, { margin: 5 }]}>
          <View style={styles.row}>
            <Text style={[styles.normalText, { fontWeight: "bold" }]}>
              {item.name}
            </Text>
            <Text style={[styles.normalText, { color: "#9A9CD0" }]}>
              {timeToString(item.date)}
            </Text>
          </View>

          {/* exercise info */}
          <Text style={styles.normalText}>
            {item.type == "Repetition Exercise" && `${item.reps} reps `}
          </Text>
          <Text style={styles.normalText}>
            {item.caloriesBurned.toFixed(2)} cal
          </Text>
          <Text style={styles.normalText}>
            {min}:{sec} elapsed
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: 50 }]}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ zIndex: 3, position: "absolute" }}
        >
          <IoIosArrowBack size={40} />
        </TouchableOpacity>

        <View style={{ width: "100%" }}>
          <Text style={[styles.heading2, { textAlign: "center" }]}>
            Exercise History
          </Text>
        </View>
      </View>
      {history.length ? (
        <FlatList data={history} renderItem={renderItem} />
      ) : (
        <Text style={styles.normalText}>
          No history yet. Begin an exercise to see your progress.
        </Text>
      )}
    </SafeAreaView>
  );
}
