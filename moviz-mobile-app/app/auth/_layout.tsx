import { Stack } from 'expo-router';

// Dedicated auth stack for login/signup/password flows.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginScreen" />
      <Stack.Screen name="signupScreen" />
      <Stack.Screen name="forgotPasswordScreen" />
      <Stack.Screen name="verifyOTPScreen" />
      <Stack.Screen name="newPasswordScreen" />
    </Stack>
  );
}
