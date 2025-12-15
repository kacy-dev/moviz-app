import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
const colors = require("@/src/constants/colors");
import HeaderNav from "@/src/components/HeaderNav";
import { Ionicons } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";
import { TextPoppins } from '@/src/components/Fonts';
import { FontWeight } from '@shopify/react-native-skia';

export const PRIVACY_TERMS = [
    {
        id: "1",
        title: "Privacy Policy",
        content: "Learn how we handle your data, protect your privacy, and use analytics to improve your experience' to reset your password.",
        buttonText: "Read Privacy Policy",
        route: "/privacyPolicyScreen"
    },
    {
        id: "2",
        title: "Terms of Use",
        content: "Understand the rules for using MOVIZ and what’s expected from our users.",
        buttonText: "Read Terms of Use",
        route: "/privacyTermsScreen"
    },
    {
        id: "3",
        title: "Data & Security",
        content: "MOVIZ never shares your personal data or recorded clips with third parties.",
        buttonText: undefined
    },

];

const filteredContent = PRIVACY_TERMS.filter(pt => pt.buttonText !== null)



export default function PrivacyTermsMainScreen() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle={"Privacy / Terms"} router={() => router.back()} />

            <ScrollView style={styles.subWrapper}>
                {filteredContent.map(item => (
                    <View key={item.id} style={{ marginBottom: 24 }}>
                        <TextPoppins style={{ color: colors.textColor, fontWeight: 600, fontSize: 18 }} weight='semiBold'>{item.title}</TextPoppins>
                        <TextPoppins style={{ color: colors.textColor, fontWeight: 600, fontSize: 12, marginTop: 8 }} weight='medium'>{item.content}</TextPoppins>

                        {filteredContent && item.buttonText && (
                            <TouchableOpacity style={styles.button} onPress={() => {
                                if (item.route) {
                                    router.push(`${item.route}`)
                                }
                            }}>
                                <TextPoppins style={styles.btnText}>
                                    {item.buttonText}
                                </TextPoppins>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

                <TextPoppins style={{color: colors.generalMute, fontWeight: 500, fontSize: 12}} weight='medium'>
                    For any questions about your data or account, contact: support@moviz.app
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
        backgroundColor: colors.bgDark
    },
    subWrapper: {
        paddingHorizontal: 16,
        marginTop: 32,

    },
   
    Hfooter: {
        marginTop: 24,
    },
    button: {
        backgroundColor: colors.textColor,
        borderRadius: 12,
        padding: 10,
        alignSelf: "flex-start",
        marginTop: 10
    },
    btnWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        marginTop: 24
    },
    btnText: {
        fontSize: 16,
        fontWeight: 500
    }
});

