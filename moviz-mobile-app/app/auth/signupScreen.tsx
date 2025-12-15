import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import "../../global.css";
import CustomInput from "../../src/components/CustomInput";
import Divider from "../../src/components/Divider";
import LoadingOverlay from "../../src/components/LoadingOverlay";
import { useAuth, useOnboarding } from "../../src/store/hooks";
const colors = require("../../src/constants/colors");

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const router = useRouter();
    const { login, setLoading, setError, isLoading } = useAuth();
    const { setHasOnboarded } = useOnboarding();

    const handleCreateAccount = async () => {
        try {
            setLoading(true);
            // TODO: replace with real signup API call
            const newUser = { id: 'local', username: username || 'NewUser', email: email || '' };
            // persist user session, then take user to genre preference step
            login('demo-token', newUser);
            router.replace('/genrePreferenceScreen');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
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

                <Text style={styles.header}>Create a new Account</Text>

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

                <Text className="text-[#F0E7F7] leading-normal">By clicking 'Create account', you're agreeing to our <Text className="text-[#E8BA00]">Terms & Conditions</Text> and Privacy Policy</Text>

                <TouchableOpacity onPress={handleCreateAccount}>
                    <LinearGradient
                        colors={["#6A0DAD", "#2C0547"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.buttonText}>Already Have an account? <TouchableOpacity onPress={() => router.replace("/auth/login")} ><Text className="text-[#9B5DC8] text-[16px] relative top-1">Login</Text></TouchableOpacity></Text>

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
        color: colors.activeInputBorder,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        fontWeight: 600,
        fontStyle: "normal",
        marginBottom: 28,
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
        fontSize: 16,
        color: colors.muted,
        marginTop: 8,
        fontWeight: "400",
        letterSpacing: -0.32,
    },

    welcomeLogo: {
        width: 24.703,
        height: 20.555,
    },

    lastBtn: {
        height: 35,
        width: width,
        backgroundColor: "#fff",
        borderRadius: 100,
        textAlign: "center",
    }
});
