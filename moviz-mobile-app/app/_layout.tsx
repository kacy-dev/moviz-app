import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
        {/* <Stack.Screen name="splash"/>
        <Stack.Screen name="Welcome" /> */}
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signUp" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}
