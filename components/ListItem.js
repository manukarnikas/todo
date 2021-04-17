import React from "react";
import {
  View,
  Text,
  CheckBox,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, ComicNeue_300Light } from "@expo-google-fonts/comic-neue";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialIcons } from "@expo/vector-icons";

const ListItem = (props) => {
  const { id, task, isComplete } = props.item;
  const onComplete = props.onComplete;
  const deleteItem = props.deleteItem;

  let [fontsLoaded] = useFonts({
    comic: ComicNeue_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderRightAction = ()=>{
    return (
      <View style={styles.Swipe}>
        <MaterialIcons name="delete" size={24} color="black" onPress={()=> deleteItem(id)} />
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#d1d1d1"
        onPress={() => {}}
      >
        <View style={styles.ListContainer}>
          <Text style={[styles.ListText, isComplete && styles.Strike]}>
            {task}
          </Text>
          <CheckBox value={isComplete} onValueChange={() => onComplete(id)} />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  ListText: {
    fontFamily: "comic",
    fontSize: 18,
  },
  Strike: {
    textDecorationLine: "line-through",
  },
  Swipe:{
    backgroundColor: '#ff0048',
    padding: 20,
    width: 150
  }
});

export default ListItem;
