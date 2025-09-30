import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    View,
    Animated,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Index() {
    const router = useRouter();

    const [showSplash, setShowSplash] = useState(true);

    const splashOpacity = useRef(new Animated.Value(1)).current;
    const mainOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
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

        return () => clearTimeout(timer);
    }, []);

    
    useEffect(() => {
        if (!showSplash) {
            setTimeout(async () => {
                const onboarded = await AsyncStorage.getItem("hasOnboarded");
                const token = await AsyncStorage.getItem("authToken");

                if (!onboarded) {
                    router.replace("/onboarding");
                } else if (!token) {
                    router.replace("/auth/login");
                } else {
                    router.replace("/(tabs)/home");
                }
            }, 2000);
        }
    }, [showSplash]);

    //   useEffect(() => {
    //       setTimeout(() => {
    //         router.replace("/auth/login");
    //     })
    //   },[])

    return (
        <View style={{ flex: 1, backgroundColor: "#121212" }}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    { opacity: splashOpacity },
                ]}
            >
                <LinearGradient
                    colors={["#121212", "#121212", "#6A0DAD"]}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.fullGradient}
                >
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.splashLogo}
                        resizeMode="contain"
                    />
                </LinearGradient>
            </Animated.View>

            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    { opacity: mainOpacity },
                ]}
            >
                <LinearGradient
                    colors={["#121212", "#121212", "#6A0DAD"]}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.fullGradient}
                >
                    <View style={styles.subtitleWrapper}>
                        <Image
                            source={require("../assets/images/logo.png")}
                            style={styles.welcomeLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>MOVIZ</Text>
                    </View>
                    <Text style={styles.subtitle}>Discover movies by scenes</Text>
                </LinearGradient>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullGradient: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    splashLogo: {
        height: 110,
        width: 130,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFD700",
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#EFE6FD",
        marginTop: 8,
        fontWeight: "400",
        letterSpacing: -0.32,
    },
    welcomeLogo: {
        width: 82,
        height: 69,
    },
    subtitleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
});
