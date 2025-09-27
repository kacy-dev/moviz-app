import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput({
  label,
  placeholder,
  secure,
  keyboardType,
  value,
  onChangeText,
  iconName,       // pass icon name
  iconColor = "#fff", // optional color default
  iconSize = 20,  // optional size default
}) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = isFocused || value ? "#222" : "#ccc";

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ position: "relative" }}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{ position: "absolute", top: 14, left: 10 }}
          />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          secureTextEntry={secure}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            { borderColor, paddingLeft: iconName ? iconSize + 16 : 12 }, 
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    color: "#FFD700",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    color: "#fff",
    fontFamily: "Sora_400Regular",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});
