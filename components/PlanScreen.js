import {
    Text,
    View,
    SafeAreaView, TextInput
  } from "react-native";
import { Input, Button } from "react-native-elements";
import {styles} from "../App"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState, useEffect} from "react"
import { IoIosArrowBack } from "react-icons/io";
import { TouchableOpacity } from "react-native-web";

export default function PlanScreen({route, navigation}){
    const inputStyles = {
        style: styles.inputs.basic,
        containerStyle: styles.inputs.containerStyle,
        labelStyle: styles.inputs.label,
        inputContainerStyle: styles.inputs.inputContainerStyle,
      }
      let [planName, setPlanName] = useState("")
      let [exercises, setExercises] = useState([])
    return(
        <SafeAreaView style={[styles.container, {paddingHorizontal:50}]}>
         <View>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{zIndex:3, position:"absolute"}}>
              <IoIosArrowBack size={40}/>
          </TouchableOpacity>

          <View style={{width:"100%"}}>
              <Text style={[styles.heading2, {textAlign:"center"}]}>Create a Plan</Text>
          </View>
        </View>
        <View style={{alignItems:"center"}}>
        <Input 
                value={planName}
                onChangeText={(value)=>setPlanName (value)}
                placeholder="Plan name" 
                {...inputStyles}/>
          </View>
          <View style={styles.smallBox}>
            <Text>help</Text>
          </View>

        </SafeAreaView>
    )
}