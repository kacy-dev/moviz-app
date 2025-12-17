import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { TextSora, TextPoppins, TextPacifico } from "../../../src/components/Fonts";
const colors = require("../../../src/constants/colors");
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/store/hooks';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";


const width = Dimensions.get("window").width;

const SETTINGS_ITEMS = [
  {
    id: 1,
    label: "Profile",
    icon: require("../../../assets/images/user.png"),
    route: "/(tabs)/settings/profileScreen",  
  },
  {
    id: 2,
    label: "Notifications",
    icon: require("../../../assets/images/notification-03.png"),
    route: "/(tabs)/settings/notificationScreen",
  },
  {
    id: 3,
    label: "Usage Guide",
    icon: require("../../../assets/images/book-04.png"),
    route: "/(tabs)/settings/usageGuideScreen",
  },
  {
    id: 4,
    label: "Send Feedback",
    icon: require("../../../assets/images/mail-01.png"),
    route: "/(tabs)/settings/feedbackScreen",
  },
  {
    id: 5,
    label: "Rate Moviz",
    icon: require("../../../assets/images/star-circle.png"),
    route: "/(tabs)/settings/rateMovizScreen",
  },
  {
    id: 6,
    label: "Help & Support",
    icon: require("../../../assets/images/help-circle.png"),
    route: "/(tabs)/settings/helpSupportScreen",
  },
  {
    id: 7,
    label: "Privacy / Terms",
    icon: require("../../../assets/images/security-check.png"),
    route: "/(tabs)/settings/privacyTermsMainScreen",
  },
];


export default function Index() {
  const router = useRouter();
  const { logout, setLoading, isLoading } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true)

      logout();

      await AsyncStorage.removeItem("auth-storage");

      router.replace("/auth/loginScreen");
    } catch (error) {
      console.log("Logout Failed", error);
    } finally {
      setLoading(false);
      setShowLogoutModal(false);
    }
  }
  return (
    <View style={styles.container}>

      <TextPoppins style={styles.title}>Settings</TextPoppins>

      <ScrollView style={styles.subContainer}>
        <View>

          <LinearGradient colors={[colors.brandRed, colors.purple]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.planBanner}
          >
            <Image source={require("../../../assets/images/Group 13 (1).png")} />
            <View style={{width: 170}}>
              <TextPacifico style={styles.planTitle}>
                Get MOVIZ Premium ⚡
              </TextPacifico>
              <TextPoppins style={{ color: colors.textColor, marginTop: 12}}>
                Unlimited recognitions. No ads. Just pure movie Magic
              </TextPoppins>
            </View>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push("/premuimGoScreen")}>
              <TextPoppins style={[{ fontWeight: 500 }]}>Get Pro</TextPoppins>
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ marginTop: 24, marginBottom: 150 }}>
            {SETTINGS_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.barWrapper}
                onPress={() => {
                  if (item.route) {
                    router.push(`${item.route}`);
                  }
                }}
              >
                <View style={styles.subBarWrapper}>
                  <Image style={styles.setIcon} source={item.icon} />
                  <TextPoppins style={styles.setText}>{item.label}</TextPoppins>
                </View>

                <Ionicons
                  name="chevron-forward"
                  color={colors.generalMute}
                  size={24}
                />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.barWrapper} onPress={() => setShowLogoutModal(true)}>
              <View style={styles.subBarWrapper}>
                <Image style={styles.setIcon} source={require("../../../assets/images/logout-04.png")} />
                <TextPoppins style={styles.setText}>Log out</TextPoppins>
              </View>
              {/* <Ionicons name="chevron-forward" color={colors.generalMute} size={24}/> */}
              <Image style={styles.setIcon} source={require("../../../assets/images/logout-02.png")} />
            </TouchableOpacity>

            <TextPoppins style={{ color: colors.textColor, textAlign: "center" }}>Version 1.0.0</TextPoppins>

            <Modal
              isVisible={showLogoutModal}
              onBackdropPress={() => setShowLogoutModal(false)}
              animationIn="zoomIn"
              animationOut="zoomOut"
              backdropTransitionOutTiming={0}
            >
              <View
                style={{
                  backgroundColor: "#1A1A1A",
                  padding: 20,
                  borderRadius: 16,
                  width: 320,
                  // height: 427,
                  alignSelf: "center"
                }}
              >
                <TextPoppins
                  style={{
                    color: colors.textColor,
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 20,
                    textAlign: "center"
                  }}
                >
                  Logout of <TextPoppins style={{color: colors.brandYellow}}>MOVIZ</TextPoppins>?
                </TextPoppins>

                <Image source={require("../../../assets/images/logout-img.png")} style={{justifyContent: "center", alignSelf: "center"}} />

                   <TextPoppins style={{
                    fontSize: 16,
                    fontWeight: 300,
                    fontStyle: "italic",
                    marginVertical: 20,
                    color: colors.textColor,
                    maxWidth: 150,
                    textAlign: "center",
                    alignSelf: "center"
                   }}>
                    Don’t worry, your account data is safe.
                   </TextPoppins>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => setShowLogoutModal(false)}
                    style={{
                      flex: 1,
                      padding: 14,
                      borderRadius: 8,
                      backgroundColor: "transparent",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: colors.textColor
                    }}
                  >
                    <Text style={{ color: colors.textColor, fontSize: 16, fontWeight: 500 }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                      flex: 1,
                      padding: 14,
                      borderRadius: 8,
                      backgroundColor: "#B53737",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: colors.textColor, fontSize: 16, fontWeight: 500 }}>Yes, Log out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', 
    paddingTop: 68,
    alignItems: 'center',
    backgroundColor: colors.bgDark,
  },
  title: {
    fontSize: 18,
    color: colors.textColor,
    fontWeight: '500',
    paddingBottom: 10,
  },
  subContainer: {
    paddingHorizontal: 16,
  },

  planTitle: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: 400,

  },
  planBanner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: width - 30,
    // height: 116,
    padding: 10,
    borderRadius: 16,
    gap: 16,
    // marginTop: 27,
    width: Dimensions.get("window").width - 30,
  },
  actionBtn: {
    backgroundColor: colors.textColor,
    borderRadius: 50,
    width: 56,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  setText: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: 500,
  },
  setIcon: {
    height: 24,
    width: 24
  },
  barWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#202020",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 24,
  },
  subBarWrapper: {
    flexDirection: "row",
    gap: 17,
    alignItems: "center",
  }


});
