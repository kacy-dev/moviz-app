import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
const colors = require("@/src/constants/colors");
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins } from "@/src/components/Fonts";
import { LinearGradient } from "expo-linear-gradient";

const USAGE_GUIDE = [
    {
        id: 1,
        title: "🎬 Open MOVIZ 😄",
        description: "Launch the app and get ready to discover movie magic!",
    },
    {
        id: 2,
        title: "🎯 Tap Record a Scene 😉",
        description: "Hit the Identify button to start searching for your movie.",
    },
    {
        id: 3,
        title: "📹 Record or Upload a Clip 🤳",
        description: "Record a short video or pick one from your gallery.",
    },
    {
        id: 4,
        title: "⏳ Wait a Few Seconds for Results 😌",
        description: "Sit back while MOVIZ works its magic behind the scenes.",
    },
    {
        id: 5,
        title: "🍿 View Details & Save 🤩",
        description: "See your movie match, explore details, and save it for later!",
    },
];


export default function UsageGuideScreen() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle={"Usage Guide"} router={() => router.back()} />

            <ScrollView style={{ marginTop: 24 }}>
                {USAGE_GUIDE.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                        }}
                    >

                        <LinearGradient
                            colors={[colors.purple, colors.brandYellow]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.LinearWrapper}
                        >
                            <View
                                style={styles.contentWrapper}
                            >
                                {/* <View> */}
                                    <TextPoppins style={{ color: colors.textColor, fontSize: 18, fontWeight: "600", textAlign: "center" }}>
                                        {item.title}
                                    </TextPoppins>

                                    <TextPoppins
                                        style={{
                                            color: colors.textColor,
                                            fontSize: 12,
                                            marginTop: 6,
                                            lineHeight: 18,
                                            fontWeight: 500,
                                            textAlign: "center",
                                        }}
                                    >
                                        {item.description}
                                    </TextPoppins>
                                {/* </View> */}

                            </View>

                        </LinearGradient>

                    </View>
                ))}

                <TextPoppins style={{
                    color: "#E6E6E6B2",
                    fontSize: 12,
                    lineHeight: 18,
                    fontWeight: 600,
                    marginTop: 24,
                    alignSelf: "center",
                    textAlign: "center",
                    maxWidth: 230,
                }}>
                    Need help? Visit “Help & Support” anytime
                    we’ve got you covered.
                </TextPoppins>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#121212'
    },
    title: {
        fontSize: 18,
        color: '#E8C400',
        fontWeight: '600'
    },

    LinearWrapper: {
        padding: 1,
        borderRadius: 12,

    },

    contentWrapper: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        textAlign: "center",
        backgroundColor: "#333333",
        padding: 12,
        borderRadius: 12,
    }
});

