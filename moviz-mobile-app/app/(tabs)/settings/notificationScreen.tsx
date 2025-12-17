import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
const colors = require("@/src/constants/colors");
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins } from "@/src/components/Fonts";

const NOTIFICATION_SETTINGS = [
    {
        key: "important",
        header: "App Notifications",
        title: "Allow Notifications",
        description: "Turn on to receive important alerts from MOVIZ.",
    },
    {
        key: "recommendations",
        header: "Recognition Updates",
        title: "Result Alerts",
        description: "Get notified when your movie recognition is complete.",
    },
    {
        key: "updates",
        header: "Tips & Updates",
        title: "New Features & App Announcements",
        description: "Stay updated on improvements and feature releases.",
    },
];


export default function NotificationScreen() {

    const [settings, setSettings] = useState({
        important: true,
        recommendations: false,
        updates: true,
    });

    const toggle = (key: string) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle={"Notifications"} router={() => router.back()} />

            <ScrollView style={{ marginTop: 24 }}>
                {NOTIFICATION_SETTINGS.map((item) => (
                    <View
                        key={item.key}
                        style={{
                            paddingVertical: 12,
                            // marginTop: 24,
                            paddingHorizontal: 16,
                        }}
                    >
                        <TextPoppins style={{ color: colors.textColor, fontSize: 18, fontWeight: "500" }}>
                            {item.header}
                        </TextPoppins>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#333333",
                                padding: 12,
                                borderRadius: 12,
                                marginTop: 12,
                            }}
                        >
                            <View>
                                <TextPoppins style={{ color: "#FFF", fontSize: 14, fontWeight: "500" }}>
                                    {item.title}
                                </TextPoppins>

                                <TextPoppins
                                    style={{
                                        color: colors.gray,
                                        fontSize: 12,
                                        marginTop: 6,
                                        lineHeight: 18,
                                        maxWidth: 260
                                    }}
                                >
                                    {item.description}
                                </TextPoppins>
                            </View>

                            <Switch
                                value={settings[item.key]}
                                onValueChange={() => toggle(item.key)}
                                trackColor={{ false: "rgba(120, 120, 128, 0.32)", true: "#32D74B" }}
                                thumbColor={colors.textColor}
                                style={{
                                    transform: [{ scaleX: 0.80 }, { scaleY: 0.80}],
                                }}
                            />
                        </View>

                    </View>
                ))}

                <TextPoppins style={{
                    color: "#E6E6E6B2",
                    fontSize: 14,
                    lineHeight: 18,
                    fontWeight: 600,
                    marginTop: 24,
                    alignSelf: "center",
                    textAlign: "center",
                    maxWidth: 230,
                }}>
                    You can change these anytime in your device settings
                </TextPoppins>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#121212'
    },
    title: {
        fontSize: 22,
        color: '#E8C400',
        fontWeight: '700'
    },
});

