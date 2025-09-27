import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";
import CustomInput from "../../src/components/CustomInput";
import FormBackground from "../../src/components/FormBackground";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const borderColor = isFocused ? "red" : "#fff";


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid={true}
        >
            <View style={styles.formContainer}>

                {/* <View style={{ marginBottom: 16 }}>
                    <Text style={styles.label}>Email</Text>
                    <View className="flex-row items-center" onFocus={() => setIsFocused(true)} style={[styles.imputWrapper, { borderColor }]}>
                        <Ionicons name="person-circle-outline" size={26} color={"#F0E7F7"} style={{ position: "absolute", left: 20, }} />
                        <TextInput
                            placeholder="Enter your username"
                            style={[styles.input, { borderColor }]}
                        />
                    </View>
                </View> */}
                {/* <TextInput
                    placeholder="Enter your email"
                    style={styles.input}
                    keyboardType="email-address"
                />

                <TextInput
                    placeholder="Enter password"
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="Re-enter password"
                    secureTextEntry
                    style={styles.input}
                />
                */}

                <CustomInput 
                    label="Username"
                    placeholder="Enter your username"
                    keyboardType="email-address"
                    value={username}
                    onChangeText={setUsername}
                    iconName={"person-circle-outline"}

                />
                <CustomInput 
                    label="Email Address"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    iconName={"mail-outline"}

                />
                <CustomInput 
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                    iconName={"lock-closed-outline"}
                    secure
                />
                <CustomInput 
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    iconName={"lock-closed-outline"}
                    secure
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#121212",
    },
    formContainer: {
        width: "100%",
        // borderTopColor: "red",
        // paddingVertical: 10,
        // borderWidth: 1,
        // borderRadius: 32,
    },
});
