import { Stack } from "expo-router";

export default function SettingsStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="notificationScreen" options={{ headerShown: false }} />
      <Stack.Screen name="privacyTermsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="privacyPolicyScreen" options={{ headerShown: false }} />
      <Stack.Screen name="rateMovizScreen" options={{ headerShown: false }} />
      <Stack.Screen name="helpSupportScreen" options={{ headerShown: false }} />
      <Stack.Screen name="feedbackScreen" options={{ headerShown: false }} />
      <Stack.Screen name="usageGuideScreen" options={{ headerShown: false }} />
      <Stack.Screen name="privacyTermsMainScreen" options={{ headerShown: false }} />
      <Stack.Screen name="changePasswordScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
