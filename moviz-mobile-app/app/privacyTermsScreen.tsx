import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import HeaderNav from "@/src/components/HeaderNav";
import { TextPoppins } from "@/app/_layout";
const colors = require("@/src/constants/colors");


const termsContent = [
  { type: "title", text: " 🟣 MOVIZ Terms of Use" },
  { type: "subtitle", text: "Last Updated: July 2025" },
  { type: "paragraph", text: "Welcome to MOVIZ, the app that helps you discover movies by scanning or uploading short clips." },
  { type: "paragraph", text: "By using MOVIZ, you agree to follow these simple terms." },

  { type: "section", text: "1. Using MOVIZ" },
  { type: "list", items: [
      "You can record, upload, and recognize movie clips or screenshots.",
      "You agree to use the app only for personal, non-commercial purposes.",
      "You’re responsible for any content you upload — make sure it doesn’t contain private or copyrighted material you don’t own."
    ] 
  },

  { type: "section", text: "2. Account & Access" },
  { type: "list", items: [
      "You can use MOVIZ without creating an account, but some features (like history sync and premium access) may require one.",
      "Keep your login details safe — we’re not responsible for any misuse of your account."
    ] 
  },

  { type: "section", text: "3. MOVIZ Premium" },
  { type: "list", items: [
      "Premium gives you unlimited recognitions, no ads, and priority updates.",
      "Subscriptions renew automatically unless canceled through your app store before the renewal date."
    ] 
  },

  { type: "section", text: "4. Content Recognition" },
  { type: "list", items: [
      "MOVIZ uses AI models to identify movies, and while we strive for accuracy, some results may be incorrect or unavailable.",
      "We continuously improve recognition accuracy through machine learning."
    ] 
  },

  { type: "section", text: "5. Restrictions" },
  { type: "list", items: [
      "You agree not to use MOVIZ for any illegal activity.",
      "You agree not to reverse-engineer or modify the app.",
      "You agree not to upload harmful or misleading content."
    ] 
  },

  { type: "section", text: "6. Liability" },
  { type: "paragraph", text: "MOVIZ is provided “as is.” We do our best to ensure a smooth experience, but we’re not liable for any losses caused by inaccurate results or service interruptions." },

  { type: "section", text: "7. Termination" },
  { type: "paragraph", text: "You can stop using MOVIZ anytime. We may suspend access if you violate these terms or misuse the service." },

  { type: "section", text: "8. Contact" },
  { type: "paragraph", text: "For any issues, feedback, or legal concerns:" },
  { type: "paragraph", text: "📧 support@moviz.app" },
  { type: "paragraph", text: "© 2025 MOVIZ Technologies. All rights reserved." },
];

export default function TermsOfServiceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <HeaderNav headerTitle={"Terms of Service"} router={() => router.back()} />

      <ScrollView style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 30 }}>
        {termsContent.map((item, index) => {
          switch (item.type) {
            case "title":
              return (
                <TextPoppins
                  key={index}
                  weight="semiBold"
                  style={{ color: colors.textColor, fontSize: 18, fontWeight: 600, marginBottom: 8, alignSelf: "center" }}
                >
                  {item.text}
                </TextPoppins>
              );
            case "section":
              return (
                <TextPoppins
                  key={index}
                  weight="semiBold"
                  style={{ color: colors.textColor, fontSize: 12, fontWeight: 600, marginTop: 16 }}
                >
                  {item.text}
                </TextPoppins>
              );
            case "subtitle":
              return (
                <TextPoppins
                  key={index}
                  style={{ color: colors.textColor, fontSize: 12, fontWeight: 500, marginTop: 8 }}
                >
                  {item.text}
                </TextPoppins>
              );
            case "paragraph":
              return (
                <TextPoppins
                  key={index}
                  style={{ color: colors.textColor, fontSize: 12, fontWeight: 500, marginTop: 8 }}
                >
                  {item.text}
                </TextPoppins>
              );
            case "list":
              return (
                <View key={index} style={{ marginTop: 8, paddingLeft: 12 }}>
                  {item.items.map((li, i) => (
                    <TextPoppins
                      key={i}
                      style={{ color: colors.textColor, fontSize: 12, fontWeight: 500, marginTop: 4 }}
                    >
                      {`\u2022`} {li}
                    </TextPoppins>
                  ))}
                </View>
              );
            default:
              return null;
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
