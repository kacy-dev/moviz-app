import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";
import CustomInput from "../../src/components/CustomInput";
import FormBackground from "../../src/components/FormBackground";


export default function SignUpScreen() {
    const [email, setEmail] = useState(false);
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

                <FormBackground  width="100%"
        height={400} // only cover form area
        style={StyleSheet.absoluteFill} />

                <CustomInput 
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    iconName="mail-outline"

                />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#121212",
    },
    formContainer: {
        width: "100%",
    },
    input: {
        width: "100%",
        // backgroundColor: "#1E1E1E",
        color: "#fff",
        padding: 12,
        borderRadius: 32,
        // marginBottom: 16,
        fontSize: 16,
        height: 50,
        borderWidth: 1,
        paddingLeft: 55,
    },

    imputWrapper: {
        position: "relative",

    },

    label: {
    fontSize: 14,
    fontFamily: "Sora_600SemiBold", 
    color: "#FFD700",
    marginBottom: 6,
  },
});
