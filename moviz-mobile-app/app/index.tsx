import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import "../global.css";
import { LinearGradient } from "expo-linear-gradient";



export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)/home");
    })
  }, [])

  return (
    <View className="flex-1 bg-green-300 justify-center items-center">
      {/* <LinearGradient
        colors={["#FFD700", "#800080", "#FFD700"]}r
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1 justify-center items-center"
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-3xl font-bold">🎬 Hello Splash Screen</Text>
        </View>
      </LinearGradient> */}
      <Text>
        Hello from react native
      </Text>
    </View>
  );
}
