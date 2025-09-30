import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#6A0DAD", "#2C0547"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      // style={styles.button}
    >
      <Image source={require("../assets/images/logo.png")}/>
      <Image source={require("../assets/images/reg-success.png")}/>

      <Text >Acount Creation Successful</Text>

      <TouchableOpacity>
        <Text>Go To Dashboard</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
