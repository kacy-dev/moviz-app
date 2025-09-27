import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#FFD700", "#800080", "#FFD700"]} // yellow → purple → yellow
      start={{ x: 1, y: 0 }}  // top-right
      end={{ x: 0, y: 1 }}    // bottom-left
      className="flex-1"
    >
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-3xl font-bold">
          🎬 Hello Splash Screen
        </Text>
      </View>
    </LinearGradient>
  );
}
