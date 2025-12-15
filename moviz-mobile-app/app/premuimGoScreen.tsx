import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { bgDark } from '@/src/constants/colors';
const colors = require("@/src/constants/colors");
import { TextPoppins, TextSora, TextGentium, TextInter } from '@/src/components/Fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const features = [
    "🎬 Identify unlimited movie clips",
    "⚡ Faster match results",
    "🕓 See all movies you’ve discovered",
    "🚀 Early access to new features",
    "🎞️ Ad-free experience",
];

const plans = [
    {
        id: "plan1",
        title: "Free 3 days",
        subtitle: "Then ₦800 / Month",
        discount: null,
    },
    {
        id: "plan2",
        title: "Free 7 days ",
        subtitle: "Then ₦2000 / 3Months",
        discount: "💰 Save 15%",
    },
    {
        id: "plan3",
        title: "Free 7 days ",
        subtitle: "Then ₦6500 / Annually",
        discount: "🔥 Save 30%",
    },
];

export default function PremuimGoScreen() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/images/onboarding-image2.png")}
                style={styles.image}
                resizeMode="cover"
            >
                <LinearGradient colors={[colors.bgDark, "rgba(0,0,0,0.55)"]} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={styles.overlay} />

                <View style={styles.content}>
                    <View style={styles.barWrapper}>
                        <Text></Text>
                        <Image source={require("@/assets/images/MOVIZ.png")} />
                        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", height: 45, width: 45, alignItems: "center", justifyContent: "center", borderRadius: 100 }}>
                            <Image source={require("@/assets/images/Vector.png")} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ marginTop: 24, paddingHorizontal: 16, }}>
                        <View style={{ flexDirection: "column", gap: 8 }}>
                            <LinearGradient
                                colors={[colors.purple, colors.brandYellow]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.LinearWrapper}
                            >
                                <View
                                    style={styles.contentWrapper}
                                >
                                    <TextInter style={{ color: colors.textColor, fontSize: 16, fontWeight: "600", textAlign: "center" }}>
                                        <TextInter style={{ fontWeight: 800 }} weight='bold'>MOVIZ</TextInter> Premium ⚡
                                    </TextInter>

                                    <TextGentium
                                        style={{
                                            color: colors.textColor,
                                            fontSize: 20,
                                            marginTop: 6,
                                            fontWeight: 400,
                                            textAlign: "center",
                                        }}
                                    >
                                        Unlock the full MOVIZ experience 😍
                                    </TextGentium>
                                </View>

                            </LinearGradient>
                            <LinearGradient
                                colors={[colors.purple, colors.brandYellow]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.LinearWrapper}
                            >
                                <View
                                    style={styles.contentWrapper}
                                >


                                    {features.map((item, index) => (
                                        <TextPoppins key={index} style={styles.featureText}>
                                            {item}
                                        </TextPoppins>
                                    ))}
                                </View>

                            </LinearGradient>

                        </View>

                        <View style={{ marginTop: 24 }}>
                            {plans.map((plan) => {
                                const isSelected = selectedPlan === plan.id;
                                return (
                                    <TouchableOpacity
                                        key={plan.id}
                                        style={[
                                            styles.card,
                                            { backgroundColor: isSelected ? "#333333" : "#000000" },
                                        ]}
                                        onPress={() => setSelectedPlan(plan.id)}
                                    >
                                        <View style={[styles.checkboxOuter, isSelected && styles.checkboxSelected]}>
                                            {isSelected && <Ionicons name="checkmark" size={16} color={colors.bgDark} />}
                                        </View>

                                        <View style={styles.textWrapper}>
                                            <TextPoppins style={styles.planTitle}>{plan.title}</TextPoppins>
                                            <TextPoppins style={styles.planSubtitle}>
                                                {plan.subtitle}
                                            </TextPoppins>
                                        </View>

                                        {plan.discount && (
                                            <View style={styles.discountWrapper}>
                                                <TextPoppins style={styles.discountText}>
                                                    {plan.discount}
                                                </TextPoppins>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity >
                            <LinearGradient
                                colors={[colors.purple, colors.brandYellow]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: 16,
                                    height: 56,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <TextPoppins style={{ alignSelf: "center", fontSize: 16, fontWeight: 600, color: colors.textColor}} weight='bold'>
                                    Start 3 Days Free Trial
                                </TextPoppins>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={{flexDirection: "row", justifyContent: "center", gap: 27, marginBottom: 37}}>
                        <TouchableOpacity>
                            <TextPoppins style={{color: colors.generalMute}}>Privacy</TextPoppins>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <TextPoppins style={{color: colors.generalMute}}>RestorePurchase</TextPoppins>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <TextPoppins style={{color: colors.generalMute}}>Privacy Policy</TextPoppins>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDark,
    },

    image: {
        flex: 1,
        width: "100%",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: "rgba(0,0,0,0.55)", 
    },

    content: {
        flex: 1,
        zIndex: 2, 
    },

    barWrapper: {
        marginTop: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },

    LinearWrapper: {
        padding: 1,
        borderRadius: 12,

    },

    contentWrapper: {
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: 16,
        borderRadius: 12,
    },
    featureText: {
        fontSize: 12,
        color: colors.textColor,
        marginBottom: 16,
        fontWeight: 500,

    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    checkboxOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.textColor,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    checkboxSelected: {
        backgroundColor: colors.textColor,
    },
    textWrapper: {
        flex: 1,
    },
    planTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.textColor,
    },
    planSubtitle: {
        fontSize: 12,
        fontWeight: "500",
        color: colors.generalMute,
    },
    discountWrapper: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    discountText: {
        color: colors.generalMute,
        fontSize: 12,
        fontWeight: "600",
    },
});
