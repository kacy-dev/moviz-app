import React, { useState, useMemo } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

import LoadingOverlay from "@/src/components/LoadingOverlay";
import CustomInput from "@/src/components/CustomInput";
import HeaderNav from "@/src/components/HeaderNav";
import { useAuth } from "@/src/store/hooks";
import { TextSora } from "@/src/components/Fonts";

const colors = require("@/src/constants/colors");

export default function ChangePasswordScreen() {
    const router = useRouter();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const { setLoading, setError, isLoading } = useAuth();

    const isFormValid = useMemo(
        () => oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0,
        [oldPassword, newPassword, confirmPassword]
    );

    const handleChangePassword = async () => {
        setOldPasswordError(null);
        setConfirmPasswordError(null);

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Passwords doesn't match");
            return;
        }

        try {
            setLoading(true);

            // MOCK CHECK (replace with API later)
            const isOldPasswordCorrect = oldPassword === "123456";

            if (!isOldPasswordCorrect) {
                setOldPasswordError("Old password is incorrect");
                return;
            }

            // success
            alert("Password changed successfully");
            router.back();

        } catch (err) {
            setError(err instanceof Error ? err.message : "Password update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid
        >
            <HeaderNav headerTitle="Change Password" router={() => router.back()} />

            <LoadingOverlay visible={isLoading} />

            <View style={styles.formContainer}>

                {/* Old Password */}
                <View>
                    <CustomInput
                        label="Old Password"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChangeText={(text) => {
                            setOldPassword(text);
                            setOldPasswordError(null);
                        }}
                        iconName="lock-closed-outline"
                        secure
                    />
                    {oldPasswordError && (
                        <Text style={styles.errorText}>{oldPasswordError}</Text>
                    )}
                </View>

                {/* New Password */}
                <CustomInput
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    iconName="lock-closed-outline"
                    secure
                />

                {/* Confirm Password */}
                <View>
                    <CustomInput
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            setConfirmPasswordError(null);
                        }}
                        iconName="lock-closed-outline"
                        secure
                    />
                    {confirmPasswordError && (
                        <Text style={styles.errorText}>{confirmPasswordError}</Text>
                    )}
                </View>

                {/* Submit */}
                <TouchableOpacity
                    disabled={!isFormValid}
                    onPress={handleChangePassword}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={
                            isFormValid
                                ? [colors.purple, colors.purple]
                                : ["#8C8C8C", "#8C8C8C"]
                        }
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Change Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <TextSora
                style={{
                    marginTop: 100,
                    marginBottom: 0,
                    alignSelf: "center",
                    color: colors.generalMute,
                    fontSize: 10,
                    fontWeight: 700,
                }}
                weight="bold"
            >
                Version 1.0.0
            </TextSora>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
        // paddingTop: 8,
        backgroundColor: colors.bgDark,
    },
    formContainer: {
        width: "100%",
        marginTop: 24,
        flexDirection: "column",
        gap: 10
    },
    headerOne: {
        color: colors.brandYellow,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    header: {
        color: colors.muted,
        fontSize: 14,
        marginBottom: 24,
    },
    button: {
        borderRadius: 32,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    buttonText: {
        color: colors.submitText,
        fontSize: 16,
        fontWeight: "600",
    },
    errorText: {
        color: colors.errorRed,
        marginTop: 0,
        marginBottom: 8,
        fontSize: 14,
    },
});
