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

export default function Settings({navigation}){
    const inputStyles = {
        style: styles.inputs.basic,
        containerStyle: styles.inputs.containerStyle,
        labelStyle: styles.inputs.label,
        inputContainerStyle: styles.inputs.inputContainerStyle,
      }

      let [userInfo, setUserInfo] = useState({
        weight:"",
        heightFT:"",
        heightIN:"",
        calorieGoal:"",
        timeGoal:""
    })


      //get user data from local storage when component loads
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
      },  [])

        //   on press of save button
      const handleSave = async ()=>{
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          } catch (err) {
            console.error(err);
          }
        navigation.navigate("Home")
      }
    return(
        <SafeAreaView style={[[styles.container, {paddingHorizontal:50}]]}>
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
                    <IoIosArrowBack size={40}/>
                </TouchableOpacity>

                <View style={{textAlign:"center"}}>
                    <Text style={[styles.heading2]}>Settings</Text>
                </View>
                <View/>
            </View>
            <View style={styles.smallBox}>
            <Text style={[styles.heading3, {textAlign:"center"}]}>Body Composition</Text>
                <Input 
                label="Weight" 
                value={userInfo.weight}
                onChangeText={(value)=>setUserInfo({...userInfo, weight: value})}
                placeholder="lbs" 
                {...inputStyles}/>

                <View style={{flexDirection:"row"}}>
                    <Input 
                    label="Height" 
                    value={userInfo.heightFT}
                    onChangeText={(value)=>setUserInfo({...userInfo, heightFT: value})}
                    placeholder="ft" 
                    {...inputStyles}/>

                    <Input 
                    label=" " 
                    value={userInfo.heightIN}
                    onChangeText={(value)=>setUserInfo({...userInfo, heightIN: value})}
                    placeholder="in" 
                    {...inputStyles}/>
                </View>
            </View>
            <View style={styles.smallBox}>
            <Text style={[styles.heading3, {textAlign:"center"}]}>Daily Goals</Text>
                <Input 
                label="Calorie Goal"
                value={userInfo.calorieGoal}
                onChangeText={(value)=>setUserInfo({...userInfo, calorieGoal: value})}
                placeholder="cal" 
                {...inputStyles}/>

                <Input 
                label="Time Goal" 
                value={userInfo.timeGoal}
                onChangeText={(value)=>setUserInfo({...userInfo, timeGoal: value})}
                placeholder="min" 
                {...inputStyles}/>
            </View>
            <Button title="save" onPress={handleSave}/>
        </SafeAreaView>
    )
}