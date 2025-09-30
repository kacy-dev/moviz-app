import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { center } from "@shopify/react-native-skia";

const { width } = Dimensions.get("window");
const buttonWidth = width - 32;

const slides = [
    {
        id: 1,
        title: "Discover the name of any movie from just a short clip or video.",
        description: [
            { text: "See a scene you love? ", color: "white" },
            { text: "Just scan or ", color: "white" },
            { text: "Record it", color: "#E8C400" },
        ],
        image: require("../../assets/images/onboarding-image1.png"),
        
    },
    {
        id: 2,
        title: "MOVIZ instantly identifies films from your clips, even with just a glimpse.",
        description: [
            { text: "Recognize", color: "#E8C400" },
            { text: "Movies in ", color: "white" },
            { text: " Seconds", color: "white" },
             

        ],
        image: require("../../assets/images/onboarding-image2.png"),
    },
    {
        id: 3,
        title: "Build your watchlist, explore trending picks, and never lose a movie again.",
        description: [
            { text: "Save", color: "#E8C400" },
            { text: "Movies for Later", color: "white" },
            { text: "and Add Favorites", color: "white" },

             
        ],
        image: require("../../assets/images/onboarding-image3.png"),
    },
];

export default function Onboarding() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const fadeAnims = useRef(slides.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))).current;

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;

            Animated.timing(fadeAnims[currentIndex], {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();

            Animated.timing(fadeAnims[nextIndex], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            setCurrentIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            {slides.map((slide, i) => (
                <Animated.View
                    key={slide.id}
                    style={[styles.slide, { opacity: fadeAnims[i] }]}
                >
                    <ImageBackground
                        source={slide.image}
                        style={styles.image}
                        resizeMode="cover"
                    >
                        <View style={styles.overlay} />
                    </ImageBackground>

                    <View style={styles.content}>
                        <View>
                            <Text style={styles.description}>
                                {slide.description.map((part, j) => (
                                    <Text key={j} style={{ color: part.color }}>
                                        {part.text}
                                    </Text>
                                ))}
                            </Text>
                            <Text style={styles.title}>{slide.title}</Text>
                        </View>

                        <View style={styles.dotsContainer}>
                            {slides.map((_, dotIndex) => (
                                <View
                                    key={dotIndex}
                                    style={[
                                        styles.dot,
                                        { opacity: dotIndex === currentIndex ? 1 : 0.3 },
                                    ]}
                                />
                            ))}
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => router.replace("/auth/signUp")}>
                                <LinearGradient
                                    colors={["#6A0DAD", "#2C0547"]} 
                                    start={{ x: 0, y: 0.5 }}       
                                    end={{ x: 1, y: 0.5 }}         
                                    style={styles.buttonPrimary}   
                                >
                                    <Text style={styles.buttonTextOne}>Get Started</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonSecondary]}
                                onPress={() => router.replace("/auth/login")}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </Animated.View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 20 },
    slide: { ...StyleSheet.absoluteFillObject, flex: 1 },
    image: { flex: 0.9, width: "100%", justifyContent: "flex-end" },
    overlay: { ...StyleSheet.absoluteFillObject, },
    content: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 40,
    },
    title: {
        fontSize: 12,
        fontWeight: 400,
        color: "#fff",
        textAlign: "left",
        marginBottom: 10
    },

    description: {
        fontSize: 24,
        textAlign: "left",
        fontWeight: 600,
        marginBottom: 8,
        color: "#fff"
    },
    buttonContainer: {
        gap: 10,
        marginHorizontal: 20,
        paddingHorizontal: 50,
    },
    buttonPrimary: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        width: buttonWidth,
        marginHorizontal: 0,
    },
    buttonSecondary: {
        backgroundColor: "#F0E7F7",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        textAlign: "center",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#000",
        fontWeight: 400,
        textAlign: "center",
        fontSize: 16,
    },
    buttonTextOne: {
        color: "#fff",
        fontWeight: 400,
        textAlign: "center",
        fontSize: 16,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginHorizontal: 4
    },
});
