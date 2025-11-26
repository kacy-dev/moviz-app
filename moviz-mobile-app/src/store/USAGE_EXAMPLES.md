// ==================== Example Usage in Components ====================

// ========== Example 1: Login Component ==========
// Import the hook
// import { useAuth } from '@/src/store/hooks';

// function LoginScreen() {
//   const { login, setLoading, setError, isLoading, error } = useAuth();

//   const handleLogin = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       login(data.token, data.user);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View>
//       {error && <Text style={{ color: 'red' }}>{error}</Text>}
//       {/* Form JSX */}
//     </View>
//   );
// }

// ========== Example 2: Movies List Component ==========
// import { useMovies } from '@/src/store/hooks';

// function MoviesList() {
//   const { movies, favorites, setSelectedMovie, addFavorite, removeFavorite, isFavorited } = useMovies();

//   const handleFavoriteToggle = (movieId: string) => {
//     if (isFavorited(movieId)) {
//       removeFavorite(movieId);
//     } else {
//       addFavorite(movieId);
//     }
//   };

//   return (
//     <FlatList
//       data={movies}
//       renderItem={({ item }) => (
//         <MovieCard
//           movie={item}
//           isFavorited={isFavorited(item.id)}
//           onFavoritePress={() => handleFavoriteToggle(item.id)}
//           onPress={() => setSelectedMovie(item)}
//         />
//       )}
//     />
//   );
// }

// ========== Example 3: Protected Route ==========
// import { useAuth } from '@/src/store/hooks';
// import { useOnboarding } from '@/src/store/hooks';

// function AppNavigator() {
//   const { isAuthenticated } = useAuth();
//   const { hasOnboarded } = useOnboarding();

//   if (!hasOnboarded) {
//     return <OnboardingStack />;
//   }

//   if (!isAuthenticated) {
//     return <AuthStack />;
//   }

//   return <MainStack />;
// }

// ========== Example 4: Theme Toggle ==========
// import { useUI } from '@/src/store/hooks';

// function ThemeToggleButton() {
//   const { isDarkMode, toggleDarkMode } = useUI();

//   return (
//     <Pressable onPress={toggleDarkMode}>
//       <Text>{isDarkMode ? '☀️' : '🌙'}</Text>
//     </Pressable>
//   );
// }

// ========== Example 5: Search with Filters ==========
// import { useSearch } from '@/src/store/hooks';
// import { useMovies } from '@/src/store/hooks';

// function SearchScreen() {
//   const { searchQuery, filters, setSearchQuery, setFilters } = useSearch();
//   const { movies } = useMovies();

//   const filteredMovies = movies.filter((movie) => {
//     const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesGenre = !filters.genre || filters.genre.some((g) => movie.genre.includes(g));
//     const matchesRating = !filters.rating || movie.rating >= filters.rating;
//     return matchesSearch && matchesGenre && matchesRating;
//   });

//   return (
//     <View>
//       <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
//       <FilterButtons onFiltersChange={setFilters} />
//       <MoviesList movies={filteredMovies} />
//     </View>
//   );
// }

// ==================== Best Practices ====================
/*
1. Always use the custom hooks (useAuth, useMovies, etc.) instead of directly accessing stores
2. Use selectors when you only need specific state properties to avoid unnecessary re-renders
3. Keep store state normalized and flat when possible
4. Avoid deeply nested objects in store state
5. Use devtools in development for debugging (available via Redux DevTools browser extension)
6. For async operations, handle loading and error states properly
7. Use the `partialize` option to only persist necessary data
8. Consider using immer middleware for complex state updates if needed
9. Test store logic independently from components
10. Document store structure and available actions for team members
*/
