import { View, Image, StyleSheet, Text } from "react-native";
import { Tabs } from "expo-router";
const colors = require("../../src/constants/colors")

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.textColor,
        tabBarInactiveTintColor: colors.textColor,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          marginTop: 12,
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* HOME TAB */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 12,
                borderRadius: 50,
                backgroundColor: focused ? colors.purple : "transparent",
                borderWidth: focused ? 0 : 1,
                borderColor: colors.textColor,
              }}
            >
              <Image
                source={require("../../assets/images/home-01.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? colors.textColor : colors.textColor,
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      {/* EXPLORE TAB (Lifted icon + label) */}
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                backgroundColor: focused ? colors.purple : "rgba(0,0,0,0.7)",
                marginTop: -35, 
                borderWidth: focused ? 0 : 1,
                borderColor: colors.textColor,
              }}
            >
              <Image
                source={require("../../assets/images/search.png")}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? colors.textColor : colors.textColor,
                }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.textColor : colors.textColor,
                fontSize: 15,
                fontWeight: "400",
                marginBottom: 15,
              }}
            >
              Explore
            </Text>
          ),
        }}
      />

      {/* SETTINGS TAB */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                padding: 12,
                borderRadius: 50,
                backgroundColor: focused ? colors.purple : "transparent",
                borderWidth: focused ? 0 : 1,
                borderColor: colors.textColor,
              }}
            >
              <Image
                source={require("../../assets/images/setting-03.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? colors.textColor : colors.textColor,
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 90,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderTopWidth: 0,
    paddingTop: 15,
    elevation: 0,
    marginHorizontal: 10,
  },
});
