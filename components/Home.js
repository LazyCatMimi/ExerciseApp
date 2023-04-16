import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import {useState} from "react"
  import {styles} from "../App"
  import {Button} from "react-native-elements"
  import { FiSettings } from "react-icons/fi";
  import AsyncStorage from '@react-native-async-storage/async-storage'
  

  export default function Home({ navigation }) {
    const exercises = require("./exercises.json");
    
    const renderItem = ({ item }) => {
      return (
        <>
          <Button 
          title={item.name}
          buttonStyle={styles.activities}
          onPress={() => navigation.navigate(item.type, {title: item.name})}>
          </Button>
        </>
      );
    };
    return (
      <SafeAreaView style={[styles.container, {paddingHorizontal:50}]}>
        <View style={styles.row}>
          <Text style={styles.title}>BuddyWorkout</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Settings")}><FiSettings color="white" size={40}/></TouchableOpacity>
        </View>

        <View style={styles.smallBox}>
            <Text style={{color:"white"}}>Daily Goal</Text>
            <Text style={{color:"white"}}>0/0</Text>
            <Text style={{color:"white"}}>0/0</Text>
        </View>
        <Text style={styles.heading2}>Start an activity</Text>
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