import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import {useState, useEffect} from "react"
  import {styles} from "../App"
  import {Button} from "react-native-elements"
  import { FiSettings } from "react-icons/fi";
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { useIsFocused } from '@react-navigation/native';

  export default function Home({ navigation }) {
    const exercises = require("./exercises.json");
    const isFocused = useIsFocused();
          //get user data from local storage when component loads
          let [userInfo, setUserInfo] = useState("")
          
    useEffect ( ()=>{
      async function getUserInfo(){
          try {
              const value = await AsyncStorage.getItem('userInfo');
              if (value !== null) {
                  setUserInfo(JSON.parse(value))
              }
        } catch (err) {
          console.error(err);
        }
      }
      getUserInfo()
    },  [isFocused])
    const renderItem = ({ item }) => {
      return (
        <>
          <Button 
          title={item.name}
          buttonStyle={styles.activities}
          onPress={() => navigation.navigate(item.type, {title: item.name, met: item.met})}>
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
            {
              userInfo.calorieGoal || userInfo.timeGoal ?<><Text style={{color:"white"}}>{userInfo.calorieGoal && "0/" +userInfo.calorieGoal }</Text>
              <Text style={{color:"white"}}>{userInfo.timeGoal && "0/" +userInfo.timeGoal}</Text></> : <Text style={{color:"white"}}>No goals set. go into settings to set a goal.</Text>
            }

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