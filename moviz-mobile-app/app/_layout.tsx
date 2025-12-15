// import { Stack } from "expo-router";


// export default function RootLayout() {
//   return (
//     // Root stack handles global screens and top-level flows. Keep splash first so
//     // it acts as the initial entry point, then onboarding/auth flows, and
//     // finally the main `(tabs)` group as the primary app area.
//     <Stack screenOptions={{ headerShown: false }}>
//       {/* Splash / boot loader (first shown) */}
//       <Stack.Screen name="index" />

//       {/* Onboarding flow can live here (optional). Auth is now a grouped layout */}
//       <Stack.Screen name="onboarding/index" />

//       {/* Auth group (login, signup, OTP, password reset) */}
//       <Stack.Screen name="auth" options={{ headerShown: false }} />

//       {/* Main tabbed application. Each tab can provide its own nested Stack layout. */}
//       <Stack.Screen name="(tabs)" />
//     </Stack>
//   );
// }


import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Sora_400Regular,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  GentiumPlus_400Regular,
  GentiumPlus_700Bold,
} from "@expo-google-fonts/gentium-plus";


const SORA_FONTS: Record<string, string> = {
  regular: "Sora_400Regular",
  bold: "Sora_700Bold",
};

const POPPINS_FONTS: Record<string, string> = {
  regular: "Poppins_400Regular",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

const PACIFICO_FONTS: Record<string, string> = {
  regular: "Pacifico_400Regular",
};

const INTER_FONTS: Record<string, string> = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  bold: "Inter_700Bold",
};

const GENTIUM_FONTS: Record<string, string> = {
  regular: "GentiumPlus_400Regular",
  bold: "GentiumPlus_700Bold",
};


interface FontProps extends TextProps {
  weight?: "regular" | "semiBold" | "medium" | "bold";
}


export const TextSora: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
  const fontFamily = SORA_FONTS[weight] || SORA_FONTS.regular;
  return <Text {...props} style={[{ fontFamily } as TextStyle, style]}>{children}</Text>;
};

export const TextPoppins: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
  const fontFamily = POPPINS_FONTS[weight] || POPPINS_FONTS.regular;
  return <Text {...props} style={[{ fontFamily } as TextStyle, style]}>{children}</Text>;
};

export const TextPacifico: React.FC<FontProps> = ({ style, children, ...props }) => {
  return <Text {...props} style={[{ fontFamily: PACIFICO_FONTS.regular } as TextStyle, style]}>{children}</Text>;
};

export const TextInter: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
  const fontFamily = INTER_FONTS[weight] || INTER_FONTS.regular;
  return <Text {...props} style={[{ fontFamily } as TextStyle, style]}>{children}</Text>;
};

export const TextGentiumPlus: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
  const fontFamily = GENTIUM_FONTS[weight] || GENTIUM_FONTS.regular;
  return <Text {...props} style={[{ fontFamily } as TextStyle, style]}>{children}</Text>;
};


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Pacifico_400Regular,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    GentiumPlus_400Regular,
    GentiumPlus_700Bold,
  });

  if (!fontsLoaded) return null; 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

