// import { useAuthStore, useMovieStore, useOnboardingStore, useUIStore, useSearchStore } from './index';

// // ==================== Auth Hooks ====================
// export const useAuth = () => {
//   const token = useAuthStore((state) => state.token);
//   const user = useAuthStore((state) => state.user);
//   const isLoading = useAuthStore((state) => state.isLoading);
//   const error = useAuthStore((state) => state.error);
//   const login = useAuthStore((state) => state.login);
//   const logout = useAuthStore((state) => state.logout);
//   const setLoading = useAuthStore((state) => state.setLoading);
//   const setError = useAuthStore((state) => state.setError);

//   return {
//     token,
//     user,
//     isLoading,
//     error,
//     login,
//     logout,
//     setLoading,
//     setError,
//     isAuthenticated: !!token,
//   };
// };

// // ==================== Movie Hooks ====================
// export const useMovies = () => {
//   const movies = useMovieStore((state) => state.movies);
//   const selectedMovie = useMovieStore((state) => state.selectedMovie);
//   const favorites = useMovieStore((state) => state.favorites);
//   const isLoading = useMovieStore((state) => state.isLoading);
//   const error = useMovieStore((state) => state.error);
//   const setMovies = useMovieStore((state) => state.setMovies);
//   const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);
//   const addFavorite = useMovieStore((state) => state.addFavorite);
//   const removeFavorite = useMovieStore((state) => state.removeFavorite);

//   return {
//     movies,
//     selectedMovie,
//     favorites,
//     isLoading,
//     error,
//     setMovies,
//     setSelectedMovie,
//     addFavorite,
//     removeFavorite,
//     isFavorited: (movieId: string) => favorites.includes(movieId),
//   };
// };

// // ==================== Onboarding Hooks ====================
// export const useOnboarding = () => {
//   const hasOnboarded = useOnboardingStore((state) => state.hasOnboarded);
//   const setHasOnboarded = useOnboardingStore((state) => state.setHasOnboarded);
//   const selectedGenres = useOnboardingStore((state) => state.selectedGenres);
//   const setSelectedGenres = useOnboardingStore((state) => state.setSelectedGenres);

//   return {
//     hasOnboarded,
//     setHasOnboarded,
//     selectedGenres,
//     setSelectedGenres,
//   };
// };

// // ==================== UI Hooks ====================
// export const useUI = () => {
//   const isDarkMode = useUIStore((state) => state.isDarkMode);
//   const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);
//   const setDarkMode = useUIStore((state) => state.setDarkMode);

//   return {
//     isDarkMode,
//     toggleDarkMode,
//     setDarkMode,
//   };
// };

// // ==================== Search Hooks ====================
// export const useSearch = () => {
//   const searchQuery = useSearchStore((state) => state.searchQuery);
//   const filters = useSearchStore((state) => state.filters);
//   const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
//   const setFilters = useSearchStore((state) => state.setFilters);
//   const clearFilters = useSearchStore((state) => state.clearFilters);

//   return {
//     searchQuery,
//     filters,
//     setSearchQuery,
//     setFilters,
//     clearFilters,
//   };
// };


import { 
  useAuthStore, 
  useMovieStore, 
  useOnboardingStore, 
  usePermissionsStore,
  useUIStore, 
  useSearchStore 
} from './index';

// ==================== Auth Hooks ====================
export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  return {
    token,
    user,
    isLoading,
    error,
    login,
    logout,
    setLoading,
    setError,
    isAuthenticated: !!token,
  };
};

// ==================== Movie Hooks ====================
export const useMovies = () => {
  const movies = useMovieStore((state) => state.movies);
  const selectedMovie = useMovieStore((state) => state.selectedMovie);
  const favorites = useMovieStore((state) => state.favorites);
  const isLoading = useMovieStore((state) => state.isLoading);
  const error = useMovieStore((state) => state.error);
  const setMovies = useMovieStore((state) => state.setMovies);
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);
  const addFavorite = useMovieStore((state) => state.addFavorite);
  const removeFavorite = useMovieStore((state) => state.removeFavorite);

  return {
    movies,
    selectedMovie,
    favorites,
    isLoading,
    error,
    setMovies,
    setSelectedMovie,
    addFavorite,
    removeFavorite,
    isFavorited: (movieId: string) => favorites.includes(movieId),
  };
};

// ==================== Onboarding Hooks ====================
export const useOnboarding = () => {
  const hasOnboarded = useOnboardingStore((state) => state.hasOnboarded);
  const setHasOnboarded = useOnboardingStore((state) => state.setHasOnboarded);
  const selectedGenres = useOnboardingStore((state) => state.selectedGenres);
  const setSelectedGenres = useOnboardingStore((state) => state.setSelectedGenres);

  return {
    hasOnboarded,
    setHasOnboarded,
    selectedGenres,
    setSelectedGenres,
  };
};

// ==================== Permissions Hooks ====================
export const usePermissions = () => {
  const camera = usePermissionsStore((state) => state.camera);
  const microphone = usePermissionsStore((state) => state.microphone);
  const location = usePermissionsStore((state) => state.location);
  const hasRequestedPermissions = usePermissionsStore((state) => state.hasRequestedPermissions);
  const setCameraPermission = usePermissionsStore((state) => state.setCameraPermission);
  const setMicrophonePermission = usePermissionsStore((state) => state.setMicrophonePermission);
  const setLocationPermission = usePermissionsStore((state) => state.setLocationPermission);
  const setHasRequestedPermissions = usePermissionsStore((state) => state.setHasRequestedPermissions);
  const setAllPermissions = usePermissionsStore((state) => state.setAllPermissions);
  const resetPermissions = usePermissionsStore((state) => state.resetPermissions);
  const checkAllPermissionsGranted = usePermissionsStore((state) => state.checkAllPermissionsGranted);

  return {
    camera,
    microphone,
    location,
    hasRequestedPermissions,
    setCameraPermission,
    setMicrophonePermission,
    setLocationPermission,
    setHasRequestedPermissions,
    setAllPermissions,
    resetPermissions,
    checkAllPermissionsGranted,
    allPermissionsGranted: camera && microphone && location,
    somePermissionsDenied: hasRequestedPermissions && (!camera || !microphone || !location),
  };
};

// ==================== UI Hooks ====================
export const useUI = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);
  const setDarkMode = useUIStore((state) => state.setDarkMode);

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };
};

// ==================== Search Hooks ====================
export const useSearch = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const filters = useSearchStore((state) => state.filters);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const setFilters = useSearchStore((state) => state.setFilters);
  const clearFilters = useSearchStore((state) => state.clearFilters);

  return {
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    clearFilters,
  };
};