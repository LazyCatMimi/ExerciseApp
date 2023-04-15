import * as React from "react";
import Constants from "expo-constants";
import { StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import { useState } from "react";
import DurationExercise from "./components/DurationExercise";
import RepetitionExercise from "./components/RepetitionExercise";

import Home from "./components/Home.js";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  // containers
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#25282D",
    color: "#FFFFFF",
  },
  activitiesContainer:{
    alignItems:"center"
  },
  actionButtonContainer:{
    flexDirection: 'row',
    justifyContent: "center",
    marginTop:20
  },
  // buttons
  activities: {
    backgroundColor: "#AAAACE",
    margin: 10,
    padding: 30,
    borderRadius: 10,
    width: 250,
  },
  button: {
    width: 200,
    margin: 10
  },
  grayButton:{
    backgroundColor: "#101010"
  },
  // text
  data:{
    fontSize:30,
    textAlign: "center",
    fontWeight: "bold",
    marginTop:20
  }
});