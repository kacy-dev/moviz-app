import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const [showSplash, setShowSplash] = useState(true);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const mainOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(mainOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => setShowSplash(false));
    }, 2000);
  }, []);

//   useEffect(() => {
//     if (!showSplash) {
//       setTimeout(async () => {
//         const onboarded = await AsyncStorage.getItem("hasOnboarded");
//         const token = await AsyncStorage.getItem("authToken");

//         if (!onboarded) {
//           router.replace("/onboarding");
//         } else if (!token) {
//           router.replace("/auth/login");
//         } else {
//           router.replace("/(tabs)/home");
//         }
//       }, 2000);
//     }
//   }, [showSplash]);

  useEffect(() => {
      setTimeout(() => {
        router.replace("/auth/signUp");
    })
  },[])

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { opacity: splashOpacity },
        ]}
      >
        <Canvas style={styles.canvas}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(width, 0)}
              end={vec(0, height)}
              colors={["#6A0DAD", "#121212", "#6A0DAD"]}
              positions={[0.02, 0.5, 0.98]}
            />
          </Rect>
        </Canvas>
        <View style={styles.overlay}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: mainOpacity }]}>
        <Canvas style={styles.canvas}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(width, 0)}
              end={vec(0, height)}
              colors={["#6A0DAD", "#121212", "#6A0DAD"]}
              positions={[0.02, 0.5, 0.98]}
            />
          </Rect>
        </Canvas>

        <View style={styles.overlay}>
          <View style={styles.subtitleWrapper}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.welcomeLogo}
            />
            <Text style={styles.title}>MOVIZ</Text>
          </View>
          <Text style={styles.subtitle}>Discover movies by scenes</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
  },
  subtitle: {
    fontSize: 16,
    color: "#EFE6FD",
    marginTop: 8,
    fontWeight: "400",
    letterSpacing: -0.32,
  },
  logo: {
    height: 109,
    width: 130,
  },
  welcomeLogo: {
    width: 82.924,
    height: 69,
  },
  subtitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
});
