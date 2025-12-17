import { Stack } from "expo-router";

export default function ExploreStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="detailScreen" options={{ headerShown: false }} />
      <Stack.Screen name="searchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="favoritesScreen" options={{ headerShown: false }} />
      <Stack.Screen name="trendingMoviesScreen" options={{ headerShown: false }} />
      <Stack.Screen name="recentSearchScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
