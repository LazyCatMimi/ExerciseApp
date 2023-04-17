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
  const itemsA = route.params.exercises.map((item) => {
    return { label: item.name, value: item.name };
  });
  // when press add, push a new sample in
  const data = route.params.exercises.map((item) => {
    return { label: item.name, value: item.name };
  });
  let [planName, setPlanName] = useState("");
  let [exerciseList, setExerciseList] = useState([sample]);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemsA);

  const handleValueChange = (value, index) => {
    // const newValues = [...selectedValues];
    // newValues[index] = value;
    // setSelectedValues(newValues);
    const cpy = exerciseList;
    cpy[index].name = value;
    setExerciseList(cpy);
    console.log(value);
  };

  const addExercise = () => {
    let cpy = exerciseList;
    setExerciseList();
  };

  const handleSubmit = async () => {
    await AsyncStorage.setItem("key", exercises);
    navigation.navigate("Home");
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.smallBox}>
      <DropDownPicker
        placeholder="Select a workout"
        open={open}
        value={item.name}
        items={items}
        setOpen={setOpen}
        // setValue={setValue}
        setValue={(value) => handleValueChange(value, index)}
        setItems={setItems}
        zIndex={3000}
        zIndexInverse={1000}
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
        <DropDownPicker
          placeholder="Select an option"
          value={value}
          items={items}
          setValue={setValue}
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
