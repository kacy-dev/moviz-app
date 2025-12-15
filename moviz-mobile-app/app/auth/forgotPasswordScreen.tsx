import React, { useState } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { useAuth } from "../../src/store/hooks";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../../src/components/CustomInput";
import LoadingOverlay from "../../src/components/LoadingOverlay";
const colors = require("../../src/constants/colors");

const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const { setLoading, setError, isLoading } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }
        try {
            setLoading(true);
            // TODO: replace with real API call to send reset code
            // After API succeeds, route to verify screen
            router.push({
                pathname: "/auth/verifyOtpScreen",
                params: { resetEmail: email, flow: "resetPassword" },
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send reset code");
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
                <Image
                    source={require("../../assets/images/forgotPassImg.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                    Enter your email address to reset your password
                </Text>

                <CustomInput
                    label="Email Address"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    iconName={"mail-outline"}
                />

                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                        colors={["#6A0DAD", "#2C0547"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Send Reset Code</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backLink}>← Back to Login</Text>
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
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.brandYellow,
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: colors.muted,
        marginBottom: 24,
        textAlign: "center",
    },
    button: {
        borderRadius: 32,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 16,
        width: width - 32,
    },
    buttonText: {
        color: colors.submitText,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 600,
    },
    backLink: {
        color: colors.link,
        fontSize: 14,
        marginTop: 12,
        fontWeight: "500",
    },
});
