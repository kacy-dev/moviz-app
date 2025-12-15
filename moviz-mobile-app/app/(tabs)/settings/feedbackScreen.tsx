import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
const colors = require("@/src/constants/colors");
import HeaderNav from "@/src/components/HeaderNav";


export default function SendFeedbackScreen() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle={"Help & Support"} router={() => router.back()} />

            <ScrollView>
                <Text style={styles.title}>Home</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
                    <Text>Go to Profile</Text>
                </TouchableOpacity>

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

