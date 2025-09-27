// components/CustomText.js
import React from "react";
import { Text } from "react-native";

export default function CustomText({ style, children, ...props }) {
  return (
    <Text
      style={[{ fontFamily: "Sora_400Regular" }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
