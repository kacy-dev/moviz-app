import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
const colors = require("@/src/constants/colors");
import HeaderNav from "@/src/components/HeaderNav";
import { Ionicons } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";
import { TextPoppins } from '@/src/components/Fonts';
import { FontWeight } from '@shopify/react-native-skia';

export const FAQS = [
    {
        id: "1",
        question: "How does MOVIZ identify movies?",
        answer: "Go to the login screen and tap on 'Forgot password' to reset your password.",
    },
    {
        id: "2",
        question: "Why didn’t MOVIZ find my movie?",
        answer: "Ensure notifications are enabled in your app settings and system settings.",
    },
    {
        id: "3",
        question: "Is MOVIZ free to use?",
        answer: "Navigate to Help & Support and use the contact form.",
    },
    {
        id: "4",
        question: "Can I use MOVIZ offline?",
        answer: "Navigate to Help & Support and use the contact form.",
    },
];

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.8}
            >
                <Text style={styles.question}>{question}</Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={22}
                    color={colors.generalMute}
                />
            </TouchableOpacity>

            <Collapsible collapsed={!isOpen}>
                <Text style={styles.answer}>{answer}</Text>
            </Collapsible>
        </View>
    );
};



export default function HelpSupportScreen() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <HeaderNav headerTitle={"Help and Support"} router={() => router.back()} />

            <ScrollView style={styles.subWrapper}>

                <TextPoppins style={styles.title}>
                    Frequently Asked Questions
                </TextPoppins>
                {FAQS.map(item => (
                    <FAQItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                    />
                ))}

                <View style={styles.Hfooter}>
                    <TextPoppins style={styles.title}>
                        Need More Help?
                    </TextPoppins>
                    <TextPoppins style={[styles.question, {fontWeight: 400, maxWidth: 300}]}>
                        Can’t find what you’re looking for? Reach out to our team
                    </TextPoppins>
                    <View style={styles.btnWrapper}>
                        <TouchableOpacity  style={styles.button}>
                            <TextPoppins style={styles.btnText}>
                                Contact Us
                            </TextPoppins>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <TextPoppins style={styles.btnText}>
                                Visit Help Center
                            </TextPoppins>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.bgDark
    },
    subWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,

    },
    title: {
        fontSize: 18,
        color: colors.textColor,
        fontWeight: '700',
        marginBottom: 24
    },

    card: {
    // backgroundColor: "#181818",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  question: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    paddingRight: 10,
  },
  answer: {
    color: "#A1A1A1",
    fontSize: 14,
    lineHeight: 22,
    paddingBottom: 16,
  },
  Hfooter: {
    marginTop: 24,
  },
  button: {
    backgroundColor: colors.textColor,
    borderRadius: 12,
    padding: 10,
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 24
  }, 
  btnText: {
    fontSize: 16,
    fontWeight: 500
  }
});

