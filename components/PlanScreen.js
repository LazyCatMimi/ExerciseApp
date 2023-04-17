import { Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TouchableOpacity } from "react-native-web";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";

export default function PlanEditScreen({ route, navigation }) {
  const inputStyles = {
    style: styles.inputs.basic,
    containerStyle: styles.inputs.containerStyle,
    labelStyle: styles.inputs.label,
    inputContainerStyle: styles.inputs.inputContainerStyle,
  };
  const sample = {
    name: "",
    type: "",
    met: "",
    goal: "",
  };
  // when press add, push a new sample in
  const data = route.params.exercises.map((item) => {
    return { label: item.name, value: item.name };
  });
  let [planName, setPlanName] = useState("");
  let [exerciseList, setExerciseList] = useState([sample]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const addExercise = () => {
    let cpy = exerciseList;
    setExerciseList();
  };

  const handleSubmit = async () => {
    await AsyncStorage.setItem("key", exercises);
    navigation.navigate("Home");
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.smallBox}>
        <Dropdown
          // style={{ zIndex: 4, position: "absolute" }}
          mode="modal"
          maxHeight={300}
          data={route.params.exercises}
          labelField="name"
          valueField="name"
          value={value}
          search
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(val) => {
            setValue(val.value);
            setIsFocus(false);
          }}
        />
        <Input
          value={planName}
          onChangeText={(value) => setPlanName(value)}
          placeholder="min"
          {...inputStyles}
          containerStyle={{ width: "100%" }}
        />
      </View>
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
            Create a Plan
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <Input
          value={planName}
          onChangeText={(value) => setPlanName(value)}
          placeholder="Plan name"
          {...inputStyles}
          containerStyle={{ width: "100%" }}
        />
      </View>
      <FlatList data={exerciseList} renderItem={renderItem} />
      {/* <View style={styles.smallBox}>
        <Dropdown
          // style={{ zIndex: 4, position: "absolute" }}
          mode="modal"
          maxHeight={300}
          data={route.params.exercises}
          labelField="name"
          valueField="name"
          value={value}
          search
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <Input
          value={planName}
          onChangeText={(value) => setPlanName(value)}
          placeholder="min"
          {...inputStyles}
          containerStyle={{ width: "100%" }}
        />
      </View> */}
      <TouchableOpacity style={styles.button} onPress={addExercise}>
        <Text style={styles.normalText}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.normalText}>Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
