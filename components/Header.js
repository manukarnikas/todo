import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, ComicNeue_700Bold } from "@expo-google-fonts/comic-neue";
import { AntDesign } from "@expo/vector-icons";

const Header = () => {
  let [fontsLoaded] = useFonts({
    comicLight: ComicNeue_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <View style={styles.fillerContainer} />
      <View style={styles.HeaderContainer}>
        <View style={styles.ComponentContainer}>
          <AntDesign name="bars" size={24} color="white" />
          <Text style={styles.title}>todo</Text>
          <AntDesign name="search1" size={24} color="white" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fillerContainer: {
    backgroundColor: "#e05138",
    height: 20,
  },
  HeaderContainer: {
    height: 60,
    backgroundColor: "tomato",
  },
  ComponentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontFamily: "comicLight",
  },
});

export default Header;
