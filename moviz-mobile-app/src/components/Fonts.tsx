// import React from "react";
// import { Text, TextProps, TextStyle } from "react-native";

// // Map weights to font variants
// const SORA_FONTS: Record<string, string> = {
//   regular: "Sora_400Regular",
//   bold: "Sora_700Bold",
// };

// const POPPINS_FONTS: Record<string, string> = {
//   regular: "Poppins_400Regular",
//   semiBold: "Poppins_600SemiBold",
//   bold: "Poppins_700Bold",
// };
// const PACIFICO_FONTS: Record<string, string> = {
//   regular: "Pacifico_400Regular",
//   semiBold: "Pacifico_600SemiBold",
//   bold: "Pacifico_700Bold",
// };

// interface FontProps extends TextProps {
//   weight?: keyof typeof SORA_FONTS | keyof typeof POPPINS_FONTS | keyof typeof PACIFICO_FONTS;
// }

// // Sora Text
// export const TextSora: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
//   const fontFamily = SORA_FONTS[weight as keyof typeof SORA_FONTS] || SORA_FONTS.regular;
//   return (
//     <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
//       {children}
//     </Text>
//   );
// };

// // Poppins Text
// export const TextPoppins: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
//   const fontFamily = POPPINS_FONTS[weight as keyof typeof POPPINS_FONTS] || POPPINS_FONTS.regular;
//   return (
//     <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
//       {children}
//     </Text>
//   );
// };
// // Pacifico Text
// export const TextPacifico: React.FC<FontProps> = ({ style, weight = "regular", children, ...props }) => {
//   const fontFamily = PACIFICO_FONTS[weight as keyof typeof PACIFICO_FONTS] || PACIFICO_FONTS.regular;
//   return (
//     <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
//       {children}
//     </Text>
//   );
// };


// import React from "react";
// import { Text, TextProps, TextStyle } from "react-native";

// // -------------------------------
// // FONT VARIANTS
// // -------------------------------

// // Sora supports multiple weights
// const SORA_FONTS: Record<string, string> = {
//   regular: "Sora_400Regular",
//   bold: "Sora_700Bold",
// };

// // Poppins supports multiple weights
// const POPPINS_FONTS: Record<string, string> = {
//   regular: "Poppins_400Regular",
//   semiBold: "Poppins_600SemiBold",
//   bold: "Poppins_700Bold",
// };

// // Pacifico has ONLY ONE weight: Regular
// const PACIFICO_FONTS: Record<string, string> = {
//   regular: "Pacifico_400Regular",
// };

// // -------------------------------
// // TYPES
// // -------------------------------
// interface FontProps extends TextProps {
//   weight?: "regular" | "semiBold" | "bold";
// }

// // -------------------------------
// // SORA TEXT COMPONENT
// // -------------------------------
// export const TextSora: React.FC<FontProps> = ({
//   style,
//   weight = "regular",
//   children,
//   ...props
// }) => {
//   const fontFamily =
//     SORA_FONTS[weight] || SORA_FONTS.regular;

//   return (
//     <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
//       {children}
//     </Text>
//   );
// };

// // -------------------------------
// // POPPINS TEXT COMPONENT
// // -------------------------------
// export const TextPoppins: React.FC<FontProps> = ({
//   style,
//   weight = "regular",
//   children,
//   ...props
// }) => {
//   const fontFamily =
//     POPPINS_FONTS[weight] || POPPINS_FONTS.regular;

//   return (
//     <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
//       {children}
//     </Text>
//   );
// };

// // -------------------------------
// // PACIFICO TEXT COMPONENT
// // (Only Regular Weight)
// // -------------------------------
// export const TextPacifico: React.FC<FontProps> = ({
//   style,
//   children,
//   ...props
// }) => {
//   return (
//     <Text {...props} style={[{ fontFamily: PACIFICO_FONTS.regular } as TextStyle, style]}>
//       {children}
//     </Text>
//   );
// };


import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

/* --------------------------------------------------
   FONT VARIANTS
-------------------------------------------------- */

// Sora
const SORA_FONTS = {
  regular: "Sora_400Regular",
  bold: "Sora_700Bold",
};

// Poppins
const POPPINS_FONTS = {
  regular: "Poppins_400Regular",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

// Pacifico (single weight only)
const PACIFICO_FONTS = {
  regular: "Pacifico_400Regular",
};

// Inter
const INTER_FONTS = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

// Gentium Plus
const GENTIUM_FONTS = {
  regular: "GentiumPlus_400Regular",
  bold: "GentiumPlus_700Bold",
};

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

type FontWeight = "regular" | "medium" | "semiBold" | "bold";

interface FontProps extends TextProps {
  weight?: FontWeight;
}

/* --------------------------------------------------
   COMPONENTS
-------------------------------------------------- */

// SORA
export const TextSora: React.FC<FontProps> = ({
  style,
  weight = "regular",
  children,
  ...props
}) => {
  const fontFamily =
    SORA_FONTS[weight as keyof typeof SORA_FONTS] ||
    SORA_FONTS.regular;

  return (
    <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
      {children}
    </Text>
  );
};

// POPPINS
export const TextPoppins: React.FC<FontProps> = ({
  style,
  weight = "regular",
  children,
  ...props
}) => {
  const fontFamily =
    POPPINS_FONTS[weight as keyof typeof POPPINS_FONTS] ||
    POPPINS_FONTS.regular;

  return (
    <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
      {children}
    </Text>
  );
};

// PACIFICO
export const TextPacifico: React.FC<FontProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[{ fontFamily: PACIFICO_FONTS.regular } as TextStyle, style]}
    >
      {children}
    </Text>
  );
};

// INTER
export const TextInter: React.FC<FontProps> = ({
  style,
  weight = "regular",
  children,
  ...props
}) => {
  const fontFamily =
    INTER_FONTS[weight as keyof typeof INTER_FONTS] ||
    INTER_FONTS.regular;

  return (
    <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
      {children}
    </Text>
  );
};

// GENTIUM PLUS
export const TextGentium: React.FC<FontProps> = ({
  style,
  weight = "regular",
  children,
  ...props
}) => {
  const fontFamily =
    GENTIUM_FONTS[weight as keyof typeof GENTIUM_FONTS] ||
    GENTIUM_FONTS.regular;

  return (
    <Text {...props} style={[{ fontFamily } as TextStyle, style]}>
      {children}
    </Text>
  );
};
