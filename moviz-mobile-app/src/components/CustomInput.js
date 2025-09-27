import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput({
  label,
  placeholder,
  secure,
  keyboardType,
  value,
  onChangeText,
  iconName,    
  iconSize = 20,   
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const active = isFocused || !!value;
  const borderColor = active ? "#fff" : "#8A8A8A";
  const iconColor = active ? "#fff" : "#aaa";

  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

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
          placeholderTextColor="#888"
          secureTextEntry={secure && !showPassword}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            {
              borderColor,
              paddingLeft: iconName ? iconSize + 16 : 12, 
              paddingRight: secure ? 40 : 12, 
            },
          ]}
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: 10, top: 14 }}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
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
    color: "#F0E7F7",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    color: "#fff",
    fontFamily: "Sora_400Regular",
    padding: 12,
    borderRadius: 32,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
  },
});

