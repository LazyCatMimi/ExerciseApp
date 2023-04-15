import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import {styles} from "../App"
  import {Button} from "react-native-elements"
  
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
      <SafeAreaView>
        <Text style={[styles.data,{textAlign:"center"}]}>Begin an activity</Text>
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