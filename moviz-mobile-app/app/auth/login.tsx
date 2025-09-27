import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";
import CustomInput from "../../src/components/CustomInput";
import FormBackground from "../../src/components/FormBackground";
import Divider from "../../src/components/Divider";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const router = useRouter();

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid={true}
        >
            <View style={styles.formContainer}>

                <View style={styles.subtitleWrapper}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.welcomeLogo}
                    />
                    <Text style={styles.title}>MOVIZ</Text>
                </View>

                <Text style={styles.headerOne}>Create a new Account</Text>
                <Text style={styles.header}>Enter your details to access your account</Text>

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

                <TouchableOpacity>
                    <Text className="text-[#E8BA00]" style={styles.fgtPassword}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <LinearGradient
                        colors={["#6A0DAD", "#2C0547"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.buttonText}>No account yet? <TouchableOpacity onPress={() => router.replace("/auth/signUp")} ><Text className="text-[#9B5DC8] text-[16px] relative top-1">Create an account</Text></TouchableOpacity></Text>

                <Divider />

                <TouchableOpacity className="flex-row justify-center items-center gap-2 bg-[#F0E7F7]" style={styles.optButton}>
                    <Image source={require("../../assets/images/google.png")} />
                    <Text>Sign up with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-center items-center gap-2 bg-[#F0E7F7] mt-4" style={styles.optButton}>
                    <Image source={require("../../assets/images/Apple.png")} />
                    <Text>Sign up with Apple</Text>
                </TouchableOpacity>


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
    },
    button: {
        borderRadius: 32,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 16,
    },
    optButton: {
        borderRadius: 32,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#DBD6D6",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        fontWeight: 600,

    },
    header: {
        color: "#F0E7F7",
        textAlign: "left",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
        fontWeight: 400,
        fontStyle: "normal",
        marginBottom: 28,
        letterSpacing: -0.4,
    },
    headerOne: {
        color: "#F0E7F7",
        textAlign: "left",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        fontWeight: 700,
        fontStyle: "normal",
        marginBottom: 10,
        letterSpacing: -0.4,
    },
    subtitleWrapper: {
        marginTop: 30,
        marginBottom: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
    },
    title: {
        fontSize: 9.533,
        fontWeight: 600,
        color: "#E8C400",
    },
    subtitle: {
        fontSize: 16,
        color: "#EFE6FD",
        marginTop: 8,
        fontWeight: "400",
        letterSpacing: -0.32,
    },

    welcomeLogo: {
        width: 24.703,
        height: 20.555,
    },
    fgtPassword: {
        textAlign: "right",
        fontSize: 14,
        fontWeight: 500,
    }
});
