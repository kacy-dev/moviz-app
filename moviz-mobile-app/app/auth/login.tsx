import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import "../../global.css";
import CustomInput from "../../src/components/CustomInput";
import Divider from "../../src/components/Divider";
import LoadingOverlay from "../../src/components/LoadingOverlay";
import { useAuth } from "../../src/store/hooks";
const colors = require("../../src/constants/colors");

const { width } = Dimensions.get("window");

export default function LoginScreen() {
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const router = useRouter();
    const { login, setLoading, setError, isLoading } = useAuth();

    const handleLogin = async () => {
        try {
            setLoading(true);
            // TODO: replace with real API call
            const demoUser = { id: 'local', username: 'Demo', email: '' };
            login('demo-token', demoUser);
            router.replace('/auth/successScreen');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid={true}
        >
            <LoadingOverlay visible={isLoading} />
            <View style={styles.formContainer}>

                <View style={styles.subtitleWrapper}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.welcomeLogo}
                    />
                    <Text style={styles.title}>MOVIZ</Text>
                </View>

                <Text style={styles.headerOne}>Login to your account</Text>
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

                <TouchableOpacity onPress={() => router.push('/auth/forgotPassword')}>
                    <Text style={[styles.fgtPassword, { color: colors.brandYellow }]}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin}>
                    <LinearGradient
                        colors={[colors.purple, colors.purpleDeep]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.buttonText}>No account yet? <TouchableOpacity onPress={() => router.replace("/auth/signUp")} ><Text style={{ color: colors.link, fontSize: 16 }}>Create an account</Text></TouchableOpacity></Text>

                <Divider />

                <TouchableOpacity style={[styles.optButton, { backgroundColor: colors.activeInputBorder }]}>
                    <Image source={require("../../assets/images/google.png")} />
                    <Text>Sign up with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.optButton, { backgroundColor: colors.activeInputBorder, marginTop: 16 }]}>
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
        backgroundColor: colors.bgDark,
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
        color: colors.submitText,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
        fontWeight: 600,

    },
    header: {
        color: colors.brandYellow,
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
        color: colors.brandYellow,
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
        color: colors.brandYellow,
    },
    subtitle: {
        color: colors.muted,
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
