import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const colors = require("@/src/constants/colors");
const { width } = Dimensions.get('window');

const UPLOAD_TIPS = [
    {
        title: "Upload Tips",
        imageLeft: require("@/assets/images/tip-good.png"),
        imageRight: require("@/assets/images/tip-good.png"),
        description: "Clear Shots\nSend high-quality images only.",
    },
    {
        title: "Good Lighting",
        imageLeft: require("@/assets/images/tip-good.png"),
        imageRight: require("@/assets/images/tip-good.png"),
        description: "Make sure your subject is well lit for better recognition.",
    },
    {
        title: "Clear Focus",
        imageLeft: require("@/assets/images/tip-good.png"),
        imageRight: require("@/assets/images/tip-good.png"),
        description: "Avoid blur. Keep the scene sharp and centered.",
    },
];

interface UploadTipsModalProps {
    visible: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export const UploadTipsModal: React.FC<UploadTipsModalProps> = ({
    visible,
    onClose,
    onComplete,
}) => {
    const [step, setStep] = useState(0);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];

    // Auto-advance through steps
    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            if (step < UPLOAD_TIPS.length - 1) {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 120,
                    useNativeDriver: true,
                }).start(() => {
                    setStep(step + 1);
                    fadeAnim.setValue(0);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 120,
                        useNativeDriver: true,
                    }).start();
                });
            }
        }, 4000); // Auto-advance every 4 seconds

        return () => clearTimeout(timer);
    }, [step, visible, fadeAnim]);

    // Reset animation when modal opens
    useEffect(() => {
        if (visible) {
            fadeAnim.setValue(1);
            setStep(0);
            setDontShowAgain(false);
        }
    }, [visible]);

    const handleGotIt = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 120,
            useNativeDriver: true,
        }).start(() => {
            onComplete();
        });
    };

    const handleDontShowAgain = () => {
        setDontShowAgain(!dontShowAgain);
    };

    const current = UPLOAD_TIPS[step];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    {/* Images Row - Good vs Bad (Non-animated) */}
                    <View style={styles.imagesRow}>
                        <Image
                            source={current.imageLeft}
                            style={styles.image}
                        />
                        <Image
                            source={current.imageRight}
                            style={styles.image}
                        />
                    </View>

                    {/* Title (Non-animated) */}
                    <Text style={styles.title}>{current.title}</Text>

                    {/* Animated Description - Only this fades */}
                    <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
                        <Text style={styles.description}>
                            {current.description}
                        </Text>
                    </Animated.View>

                    {/* Dot Indicators */}
                    <View style={styles.dots}>
                        {UPLOAD_TIPS.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === step && styles.dotActive,
                                ]}
                            />
                        ))}
                    </View>

                    {/* Don't Show Again */}
                    <TouchableOpacity
                        style={styles.dontShow}
                        onPress={handleDontShowAgain}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                dontShowAgain && styles.checkboxChecked,
                            ]}
                        >
                            {dontShowAgain && (
                                <Text style={styles.checkmark}>✓</Text>
                            )}
                        </View>
                        <Text style={styles.dontShowText}>
                            Don't show me again
                        </Text>
                    </TouchableOpacity>

                    {/* Got It Button */}
                    <TouchableOpacity
                        onPress={handleGotIt}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.purple, colors.brandYellow]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                Got it
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: "#111111",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 28,
        alignItems: 'center',
    },
    title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 16,
    },
    imagesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
        width: '100%',
    },
    image: {
        width: (width - 60) / 2,
        height: 170,
        borderRadius: 16,
        resizeMode: "cover",
        backgroundColor: "#1A1A1A",
    },
    description: {
        color: "#BDBDBD",
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 18,
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#3A3A3A",
    },
    dotActive: {
        backgroundColor: colors.purple,
        width: 14,
    },
    dontShow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        alignSelf: 'flex-start',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#6C6C6C",
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.purple,
        borderColor: colors.purple,
    },
    checkmark: {
        color: colors.brandYellow,
        fontWeight: 'bold',
        fontSize: 12,
    },
    dontShowText: {
        color: "#9E9E9E",
        fontSize: 13,
    },
    button: {
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});