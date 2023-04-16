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
      let [disableSubmit, setDisableSubmit] = useState(false)
      let [error, setError] = useState({
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


      useEffect(()=>{
        setDisableSubmit(!Object.values(error).every(prop => prop.length === 0))
      }, [error])
        //   on press of save button
      const handleSave = async ()=>{
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          } catch (err) {
            console.error(err);
          }
        navigation.navigate("Home")
      }
      const verifyInput = (value, property) => {
        const regex = /^[0-9\b]+$/;
        setUserInfo({...userInfo, [property]: value})
        if (regex.test(value) || value.length === 0) {
          setError({...error, [property]: ""});
        } else {
          setError({...error, [property]: "Please enter only numbers."})
        }
        if(property==="calorieGoal" && userInfo.weight.length === 0){
          setError({...error, calorieGoal: "calories cannot be calculated without weight."})
        }
        if(property==="weight" && error.calorieGoal.length > 0 && regex.test(value)){
          setError({...error, calorieGoal: ""})
        }
      };
    return(
        <SafeAreaView style={[[styles.container, {paddingHorizontal:50}]]}>
       <View>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{zIndex:3, position:"absolute"}}>
              <IoIosArrowBack size={40}/>
          </TouchableOpacity>

          <View style={{width:"100%"}}>
              <Text style={[styles.heading2, {textAlign:"center"}]}>Settings</Text>
          </View>
        </View>
          <View/>
            <View style={styles.smallBox}>
            <Text style={[styles.heading3, {textAlign:"center"}]}>Body Composition</Text>
                <Input 
                label="Weight" 
                value={userInfo.weight}
                onChangeText={(value)=>verifyInput (value, "weight")}
                errorMessage={error.weight}
                placeholder="lbs" 
                {...inputStyles}/>

                <View style={{flexDirection:"row"}}>
                    <Input 
                    label="Height" 
                    value={userInfo.heightFT}
                    onChangeText={(value)=>verifyInput (value, "heightFT")}
                    errorMessage={error.heightFT}
                    placeholder="ft" 
                    {...inputStyles}/>

                    <Input 
                    label=" " 
                    value={userInfo.heightIN}
                    onChangeText={(value)=>verifyInput (value, "heightIN")}
                    errorMessage={error.heightIN}
                    placeholder="in" 
                    {...inputStyles}/>
                </View>
            </View>
            <View style={styles.smallBox}>
            <Text style={[styles.heading3, {textAlign:"center"}]}>Daily Goals</Text>
                <Input 
                label="Calorie Goal"
                value={userInfo.calorieGoal}
                onChangeText={(value)=>verifyInput (value, "calorieGoal")}
                errorMessage={error.calorieGoal}
                placeholder="cal" 
                {...inputStyles}/>

                <Input 
                label="Time Goal" 
                value={userInfo.timeGoal}
                onChangeText={(value)=>verifyInput (value, "timeGoal")}
                errorMessage={error.timeGoal}
                placeholder="min" 
                {...inputStyles}/>
            </View>
            <Button title="save" onPress={handleSave} disabled={disableSubmit}/>
        </SafeAreaView>
    )
}