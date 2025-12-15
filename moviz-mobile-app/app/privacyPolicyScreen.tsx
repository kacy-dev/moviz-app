import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins } from "@/app/_layout";
const colors = require("@/src/constants/colors");

// Define the content as a structured list
const privacyContent = [
    {
        type: "title", text: "  🟣 MOVIZ Privacy Policy"
    },
    { type: "subtitle", text: "Last Updated: July 2025" },
    {
        type: "paragraph",
        text: "At MOVIZ, your privacy means everything to us. We want you to understand how we collect, use, and protect your information when you use our app."
    },
    { type: "section", text: "1. What We Collect" },
    { type: "paragraph", text: "To make movie recognition work smoothly, MOVIZ may collect:" },
    {
        type: "list", items: [
            "Clips or Screenshots you upload (used only for recognition).",
            "Basic device info (model, version, performance logs).",
            "Usage data (like number of recognitions or most-used features)."
        ]
    },
    { type: "paragraph", text: "We do not collect personal identifiers such as your name, address, or contact unless you choose to share them through feedback or account creation." },
    { type: "section", text: "2. How We Use Your Data" },
    { type: "paragraph", text: "We use your data to:" },
    {
        type: "list", items: [
            "Identify movies through AI processing.",
            "Improve recognition accuracy.",
            "Notify you of updates or new features."
        ]
    },
    { type: "paragraph", text: "Your uploaded clips are processed securely and not stored permanently. Once the recognition is complete, they’re automatically cleared from our servers." },
    { type: "section", text: "3. Data Security" },
    { type: "paragraph", text: "We use encryption and secure cloud systems to ensure your data is safe. MOVIZ never sells or shares your data with third parties." },
    { type: "section", text: "4. Your Control" },
    { type: "paragraph", text: "You can:" },
    {
        type: "list", items: [
            "Delete your account anytime.",
            "Request removal of your stored data.",
            "Disable notifications or analytics in your device settings.",
            "To make a data request, contact us at support@moviz.app"
        ]
    },
    { type: "section", text: "5. Updates to This Policy" },
    { type: "paragraph", text: "We may update this policy to improve transparency. When we do, we’ll notify you in-app or by email (if you’re a registered user)." },
    { type: "paragraph", text: "📩 Questions? Reach us anytime at support@moviz.app" },
];

export default function PrivacyPolicyScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle={"Privacy Policy"} router={() => router.back()} />

            <ScrollView style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 30, }}>
                {privacyContent.map((item, index) => {
                    switch (item.type) {
                        case "title":
                            return (
                                <TextPoppins
                                    key={index}
                                    weight="semiBold"
                                    style={{ color: colors.textColor, fontSize: 18, fontWeight: 600, marginBottom: 8, alignSelf: "center" }}
                                >
                                    {item.text}
                                </TextPoppins>
                            );
                        case "section":
                            return (
                                <TextPoppins
                                    key={index}
                                    weight="semiBold"
                                    style={{ color: colors.textColor, fontSize: 12, fontWeight: 600, marginTop: 16 }}
                                >
                                    {item.text}
                                </TextPoppins>
                            );
                        case "subtitle":
                            return (
                                <TextPoppins
                                    key={index}
                                    style={{ color: colors.textColor, fontSize: 12, fontWeight: 500, marginTop: 8 }}
                                >
                                    {item.text}
                                </TextPoppins>
                            );
                        case "paragraph":
                            return (
                                <TextPoppins
                                    key={index}
                                    style={{ color: colors.textColor, fontSize: 12, fontWeight: 500, marginTop: 8}}
                                >
                                    {item.text}
                                </TextPoppins>
                            );
                        case "list":
                            return (
                                <View key={index} style={{ marginTop: 8, paddingLeft: 12 }}>
                                    {item.items.map((li, i) => (
                                        <TextPoppins
                                            key={i}
                                            style={{ color: colors.textColor, fontSize: 12, fontWeight: 500, marginTop: 4 }}
                                        >
                                            {`\u2022`} {li}
                                        </TextPoppins>
                                    ))}
                                </View>
                            );
                        default:
                            return null;
                    }
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        

    },
});
