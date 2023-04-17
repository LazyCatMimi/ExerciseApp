import { Text, View, SafeAreaView, FlatList } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TouchableOpacity } from "react-native-web";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";

export default function HistoryScreen({ route, navigation }) {
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.smallBox}>
        <Text>{item.name}</Text>
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
            Exercise History
          </Text>
        </View>
      </View>
      <FlatList
        data={route.params.history}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
