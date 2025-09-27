import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Divider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>Or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16, 
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#545454",
  },
  text: {
    marginHorizontal: 32,
    fontSize: 14,
    color: "#aaa",
    fontFamily: "Sora_600SemiBold",
  },
});
