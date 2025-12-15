import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import LoadingOverlay from '../../src/components/LoadingOverlay';
import CustomInput from "../../src/components/CustomInput";
const colors = require("../../src/constants/colors");

const { width } = Dimensions.get("window");

export default function NewPasswordScreen() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useLocalSearchParams();
    const resetEmail = (params?.resetEmail as string) || '';

    const valid = password.length >= 6 && password === confirm;

    const handleSubmit = async () => {
        if (!valid) return;
        setLoading(true);
        try {
            // TODO: call API to set new password using resetEmail
            await new Promise((r) => setTimeout(r, 900));
            setLoading(false);
            router.replace('/auth/successScreen');
        } catch (err) {
            setLoading(false);
            // show error (toast/snackbar)
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/forgotPassImg.png')} style={styles.topImage} />
            <Text style={styles.title}>Create new password</Text>
            <Text style={styles.subtitle}>Enter a new password for {resetEmail || 'your account'}</Text>

            <View style={styles.form}>
                <CustomInput
                    label={"New Password"}
                    placeholder="New password"
                    // style={styles.input}
                    // secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    iconName={"lock-closed-outline"}
                    secure
                />
                <CustomInput
                    placeholder="Confirm new password"
                    // style={styles.input}
                    // secureTextEntry
                    value={confirm}
                    onChangeText={setConfirm}
                    iconName={"lock-closed-outline"}
                    secure
                />
            </View>

            <TouchableOpacity onPress={handleSubmit} disabled={!valid} style={styles.button}>
                <LinearGradient
                    colors={valid ? ['#6A0DAD', '#2C0547'] : ['#8C8C8C', '#8C8C8C']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={[styles.button, !valid && styles.buttonDisabled]}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
                </LinearGradient>
            </TouchableOpacity>

            {loading && <LoadingOverlay />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgDark,
        paddingHorizontal: 20,
    },
    topImage: {
        width: 160,
        height: 140,
        resizeMode: 'contain',
        marginTop: 24
    },
    title: {
        color: colors.textColor,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 16
    },
    subtitle: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center'
    },
    form: {
        width: '100%',
        marginTop: 24
    },
    input: {
        backgroundColor: colors.inputBg,
        color: colors.textColor,
        padding: 14,
        borderRadius: 10,
        marginBottom: 12
    },
    button: {
        width: width - 40,
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisabled: {
        opacity: 0.9
    },
    buttonText: {
        color: colors.textColor,
        fontWeight: '700'
    },
});
