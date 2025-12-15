// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useRouter } from 'expo-router';
// const colors = require("@/src/constants/colors");
// import HeaderNav from "@/src/components/HeaderNav";


// export default function ProfileScreen() {

//     const router = useRouter();

//     return (
//         <View style={styles.container}>
//             <HeaderNav headerTitle={"Profile"} router={() => router.back()} />

//             <ScrollView>
//                 <Text style={styles.title}>Home</Text>
//                 <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
//                     <Text>Go to Profile</Text>
//                 </TouchableOpacity>

//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         // alignItems: 'center',
//         backgroundColor: '#121212'
//     },
//     title: {
//         fontSize: 22,
//         color: '#E8C400',
//         fontWeight: '700'
//     },
// });

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { TextPoppins, TextPacifico, TextSora } from "@/src/components/Fonts";
import { useAuth } from "@/src/store/hooks";
const colors = require("@/src/constants/colors");// adjust path
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import HeaderNav from "@/src/components/HeaderNav";

export default function ProfileScreen() {
    const router = useRouter();
    const user = useAuth((state) => state.user);
    const setUser = useAuth((state) => state.setUser);

    // 🔹 LOCAL STATE (CONTROLLED INPUTS)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // 🔹 LOAD STORE DATA INTO INPUTS
    useEffect(() => {
        if (!user) return;

        setUsername(user.username ?? "");
        setEmail(user.email ?? "");
    }, [user]);

    // 🔹 CHANGE DETECTION
    const hasChanges =
        username !== (user?.username ?? "") ||
        email !== (user?.email ?? "");

    const handleSaveChanges = async () => {
        if (!user || !hasChanges) return;

        try {
            // 🔹 Update DB here later

            // 🔹 Update store
            setUser({
                ...user,
                username,
                email,
            });

            Alert.alert("Success", "Profile updated successfully");
        } catch {
            Alert.alert("Error", "Update failed");
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <HeaderNav headerTitle={"Profile"} router={() => router.back()} />

            <ScrollView contentContainerStyle={styles.content}>

                {/* Avatar */}
                <View style={styles.avatarWrapper}>
                    <Image
                        source={
                            user?.avatar
                                ? { uri: user.avatar }
                                : require("@/assets/images/profile.png")
                        }
                        style={styles.avatar}
                    />

                    <TouchableOpacity style={styles.avatarEdit}>
                        <Image source={require("@/assets/images/pen.png")} />
                    </TouchableOpacity>
                </View>

                {/* Username */}
                <View style={styles.inputGroup}>
                    <TextPoppins style={styles.label}>Username</TextPoppins>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Username"
                            placeholderTextColor={colors.generalMute}
                        />
                        {/* <Ionicons name="create-outline" size={18} color={colors.muted} /> */}
                        <Image source={require("@/assets/images/edit.png")} />
                    </View>
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <TextPoppins style={styles.label}>Email Address</TextPoppins>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            placeholderTextColor={colors.generalMute}
                            keyboardType="email-address"
                        />
                        {/* <Ionicons name="create-outline" size={18} color={colors.muted} /> */}
                        <Image source={require("@/assets/images/edit.png")} />

                    </View>
                </View>

                {/* Password */}
                <View style={styles.inputGroup}>
                    <TextPoppins style={styles.label}>Password</TextPoppins>
                    <View style={styles.passwordRow}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            value="••••••••"
                            editable={false}
                        />
                        <TouchableOpacity
                            onPress={() => router.push("/(tabs)/settings/changePasswordScreen")}
                        >
                            <TextPoppins style={styles.changeText}>Change</TextPoppins>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    disabled={!hasChanges}
                    onPress={handleSaveChanges}
                    style={{ opacity: hasChanges ? 1 : 0.5 }}
                >
                    <LinearGradient
                        colors={
                            hasChanges
                                ? [colors.purple, colors.purple]
                                : ["#8C8C8C", "#8C8C8C"]
                        }
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.saveButton}
                    >
                        <TextPoppins style={styles.saveText}>
                            Save Changes
                        </TextPoppins>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
            <TextSora style={{marginBottom: 150, alignSelf: "center", color: colors.generalMute, fontSize: 10}}>
                Version 1.0.0
            </TextSora>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    avatarWrapper: {
        alignSelf: "center",
        marginVertical: 24,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: colors.brandYellow,
    },
    avatarEdit: {
        position: "absolute",
        right: 4,
        top: 4,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 6,
    },
    inputGroup: {
        marginBottom: 8,
    },
    label: {
        color: colors.textColor,
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "600",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.inputBg,
        borderRadius: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#8C8C8C"
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        paddingVertical: 12,
        height: 50,
        borderRadius: 32,
    },
    passwordRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.inputBg,
        borderRadius: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#8C8C8C"
    },
    changeText: {
        color: colors.generalMute,
        fontWeight: "700",
        marginLeft: 12,
    },
    saveButton: {
        height: 50,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 32,
    },
    saveText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: "600",
    },
});