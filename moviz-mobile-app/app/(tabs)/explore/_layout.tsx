import { Stack } from "expo-router";

export default function ExploreStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="detailScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
