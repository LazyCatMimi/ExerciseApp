import * as React from "react";
import Constants from "expo-constants";
import { StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import DurationExercise from "./components/DurationExercise";
import RepetitionExercise from "./components/RepetitionExercise";
import Home from "./components/Home.js";
import Settings from "./components/SettingsScreen.js"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Settings">
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
         <Stack.Screen
          name="Settings"
          component={Settings}
          
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
    backgroundColor: "#171722",
    color: "#FFFFFF"
  },
  activitiesContainer:{
    alignItems:"center",
    padding: 20
  },
  actionButtonContainer:{
    flexDirection: 'row',
    justifyContent: "center",
    marginTop:20
  },
  smallBox:{
    backgroundColor: "#2B2A41",
    borderRadius:10,
    padding: 20,
    marginVertical: 20
  },
  row:{
    alignItems: 'center',
    justifyContent:"space-between",
    flexDirection:"row"
  },
  // buttons
  activities: {
    backgroundColor: "#3D3ACE",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  button: {
    width: 200,
    margin: 10,
    borderRadius: 10
  },
  grayButton:{
    backgroundColor: "#101010"
  },
  // text
  title:{
    fontSize: 40,
    fontWeight: "bold",
    color:"white"
  },
  heading2:{
    fontSize: 35,
    fontWeight: "bold",
    color:"white"
  },
  heading3:{
    fontSize: 27,
    fontWeight: "bold",
    marginTop:20,
    color:"white"
  },
  data:{
    textAlign:"center",
    fontSize:30,
    fontWeight: "bold",
    marginTop:20,
    color:"white"
  },

  inputs:{
    label:{
      color:"white",
      fontSize:20,
      marginRight:10
    },
    containerStyle:{
      width:"50%",
      marginVertical: 20
    },
    basic:{
      color:"white"
    },
    inputContainerStyle:{
      borderBottomColor:"white"
    }
  }
});