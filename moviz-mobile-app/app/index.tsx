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
import { useOnboarding, useAuth } from "../src/store/hooks";
const colors = require("../src/constants/colors");

const { width, height } = Dimensions.get("window");

export default function Index() {
    const router = useRouter();
    const [showSplash, setShowSplash] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    const splashOpacity = useRef(new Animated.Value(1)).current;
    const mainOpacity = useRef(new Animated.Value(0)).current;

    const { hasOnboarded } = useOnboarding();
    const { token } = useAuth();

    // Splash animation - always runs for 2 seconds
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

    // Navigation logic - runs after splash animation completes and store hydrates
    useEffect(() => {
        if (!showSplash && isHydrated) {
            // Decide navigation based on auth state
            if (!hasOnboarded) {
                // New user - show onboarding
                router.replace("/onboarding");
            } else if (!token) {
                // User saw onboarding but not logged in - show login
                router.replace("/auth/loginScreen");
            } else {
                // User is authenticated - show home
                router.replace("/(tabs)/settings/privacyTermsMainScreen");
            }
        }
    }, [showSplash, isHydrated, hasOnboarded, token, router]);

    // Check hydration status from store - Zustand persist middleware hydrates on first render
    useEffect(() => {
        // Give Zustand a moment to hydrate from AsyncStorage
        const checkHydration = setTimeout(() => {
            setIsHydrated(true);
        }, 100);

        return () => clearTimeout(checkHydration);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.bgDark }}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    { opacity: splashOpacity },
                ]}
            >
                <LinearGradient
                    colors={[colors.bgDark, colors.bgDark, colors.purple]}
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
                    colors={[colors.bgDark, colors.bgDark, colors.purple]}
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
        color: colors.brandYellow,
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.muted,
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
