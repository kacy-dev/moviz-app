import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, Animated, Image, StyleSheet, Dimensions } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../global.css";
import { Canvas, Circle, LinearGradient, Rect, vec } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");



export default function Index() {
    const router = useRouter();
    const [showSplash, setShowSplash] = useState(true);
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                setShowSplash(false);
            })
        }, 2000)
    }, [])


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
                    router.replace("/(tabs)/home")
                }

            }, 2000);
        }
    }, [showSplash]);

    if (showSplash) {
        return (
            <View style={{  flex: 1, backgroundColor: "#121212" }}>
                <Animated.View style={[styles.container, { opacity }]} >
                    <Canvas style={styles.canvas}>
                        <Rect x={0} y={0} width={width} height={height}>
                            <LinearGradient

                                start={vec(width, 0)}
                                end={vec(0, height)}
                                colors={[
                                    "#6A0DAD",
                                    "#121212",
                                    "#6A0DAD",
                                ]}
                                positions={[0.02, 0.5, 0.98]}
                            />
                        </Rect>
                    </Canvas>

                    <View style={styles.overlay}>
                        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                    </View>
                </Animated.View>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <Canvas style={styles.canvas}>
                <Rect x={0} y={0} width={width} height={height}>
                    <LinearGradient

                        start={vec(width, 0)}
                        end={vec(0, height)}
                        colors={[
                            "#6A0DAD",
                            "#121212",
                            "#6A0DAD",
                        ]}
                        positions={[0.02, 0.5, 0.98]}
                    />
                </Rect>
            </Canvas>

            <View style={styles.overlay}>
                <View style={styles.subtitleWrapper} >
                    <Image source={require("../assets/images/logo.png")} style={styles.welcomeLogo} />
                    <Text style={styles.title}>MOVIZ</Text>
                </View>
                <Text style={styles.subtitle}>Unlimited streaming access</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
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
        fontWeight: 400,
        letterSpacing: -0.32

    },

    logo: {
        height: 109,
        width: 130
    },

    welcomeLogo: {
        width: 82.924,
        height: 69,
    },

    subtitleWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 7,
    },

});
