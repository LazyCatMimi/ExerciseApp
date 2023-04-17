import * as React from "react";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DurationExercise from "./components/DurationExercise";
import RepetitionExercise from "./components/RepetitionExercise";
import Home from "./components/Home.js";
import Settings from "./components/SettingsScreen.js";
import PlanEditScreen from "./components/PlanScreen";
import HistoryScreen from "./components/HistoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Duration Exercise"
          component={DurationExercise}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="Repetition Exercise"
          component={RepetitionExercise}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Plan Edit" component={PlanEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  // containers
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#171722",
    color: "#FFFFFF",
  },
  activitiesContainer: {
    alignItems: "center",
    padding: 20,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  smallBox: {
    backgroundColor: "#2B2A41",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  // buttons
  activities: {
    backgroundColor: "#8F8EE1",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 150,
    height: 150,
  },
  button: {
    width: 200,
    margin: 10,
    borderRadius: 10,
  },
  grayButton: {
    backgroundColor: "#101010",
  },
  // text
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  heading2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  heading3: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  data: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  normalText: {
    color: "white",
    fontSize: 17,
  },
  inputs: {
    label: {
      color: "white",
      fontSize: 15,
      marginRight: 10,
    },
    containerStyle: {
      width: "50%",
      marginVertical: 20,
    },
    basic: {
      color: "white",
    },
    inputContainerStyle: {
      borderBottomColor: "white",
    },
  },
});
