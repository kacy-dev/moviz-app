// import { create } from 'zustand';
// import { persist, createJSONStorage, devtools } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // ==================== Auth Store ====================
// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   avatar?: string;
// }

// export interface AuthState {
//   token: string | null;
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
//   setToken: (token: string | null) => void;
//   setUser: (user: User | null) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   login: (token: string, user: User) => void;
//   logout: () => void;
//   clearError: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   devtools(
//     persist(
//       (set) => ({
//         token: null,
//         user: null,
//         isLoading: false,
//         error: null,
//         setToken: (token) => set({ token }),
//         setUser: (user) => set({ user }),
//         setLoading: (isLoading) => set({ isLoading }),
//         setError: (error) => set({ error }),
//         login: (token, user) => set({ token, user, error: null }),
//         logout: () => set({ token: null, user: null, error: null }),
//         clearError: () => set({ error: null }),
//       }),
//       {
//         name: 'auth-storage',
//         storage: createJSONStorage(() => AsyncStorage),
//         partialize: (state) => ({
//           token: state.token,
//           user: state.user,
//         }),
//       }
//     ),
//     { name: 'AuthStore' }
//   )
// );

// // ==================== Movie Store ====================
// export interface Movie {
//   id: string;
//   title: string;
//   description: string;
//   posterUrl: string;
//   rating: number;
//   releaseDate: string;
//   genre: string[];
// }

// export interface MovieState {
//   movies: Movie[];
//   selectedMovie: Movie | null;
//   favorites: string[];
//   isLoading: boolean;
//   error: string | null;
//   setMovies: (movies: Movie[]) => void;
//   setSelectedMovie: (movie: Movie | null) => void;
//   addFavorite: (movieId: string) => void;
//   removeFavorite: (movieId: string) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
// }

// export const useMovieStore = create<MovieState>()(
//   devtools(
//     persist(
//       (set) => ({
//         movies: [],
//         selectedMovie: null,
//         favorites: [],
//         isLoading: false,
//         error: null,
//         setMovies: (movies) => set({ movies }),
//         setSelectedMovie: (movie) => set({ selectedMovie: movie }),
//         addFavorite: (movieId) =>
//           set((state) => ({
//             favorites: [...new Set([...state.favorites, movieId])],
//           })),
//         removeFavorite: (movieId) =>
//           set((state) => ({
//             favorites: state.favorites.filter((id) => id !== movieId),
//           })),
//         setLoading: (isLoading) => set({ isLoading }),
//         setError: (error) => set({ error }),
//       }),
//       {
//         name: 'movie-storage',
//         storage: createJSONStorage(() => AsyncStorage),
//         partialize: (state) => ({
//           favorites: state.favorites,
//         }),
//       }
//     ),
//     { name: 'MovieStore' }
//   )
// );

// // ==================== Onboarding Store ====================

// export interface OnboardingState {
//   hasOnboarded: boolean;
//   setHasOnboarded: (value: boolean) => void;
//   selectedGenres: string[];
//   setSelectedGenres: (genres: string[]) => void;
// }

// export const useOnboardingStore = create<OnboardingState>()(
//   devtools(
//     persist(
//       (set) => ({
//         hasOnboarded: false,
//         selectedGenres: [],
//         setHasOnboarded: (hasOnboarded) => set({ hasOnboarded }),
//         setSelectedGenres: (genres) => set({ selectedGenres: genres }),
//       }),
//       {
//         name: 'onboarding-storage',
//         storage: createJSONStorage(() => AsyncStorage),
//         partialize: (state) => ({
//           hasOnboarded: state.hasOnboarded,
//           selectedGenres: state.selectedGenres,
//         }),
//       }
//     ),
//     { name: 'OnboardingStore' }
//   )
// );

// // ==================== UI Store ====================
// export interface UIState {
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
//   setDarkMode: (isDark: boolean) => void;
// }

// export const useUIStore = create<UIState>()(
//   devtools(
//     persist(
//       (set) => ({
//         isDarkMode: false,
//         toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
//         setDarkMode: (isDark) => set({ isDarkMode: isDark }),
//       }),
//       {
//         name: 'ui-storage',
//         storage: createJSONStorage(() => AsyncStorage),
//       }
//     ),
//     { name: 'UIStore' }
//   )
// );

// // ==================== Search/Filter Store ====================
// export interface SearchState {
//   searchQuery: string;
//   filters: {
//     genre?: string[];
//     rating?: number;
//     year?: number;
//   };
//   setSearchQuery: (query: string) => void;
//   setFilters: (filters: SearchState['filters']) => void;
//   clearFilters: () => void;
// }

// export const useSearchStore = create<SearchState>()(
//   devtools(
//     (set) => ({
//       searchQuery: '',
//       filters: {},
//       setSearchQuery: (searchQuery) => set({ searchQuery }),
//       setFilters: (filters) => set({ filters }),
//       clearFilters: () => set({ filters: {} }),
//     }),
//     { name: 'SearchStore' }
//   )
// );


import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==================== Auth Store ====================
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        isLoading: false,
        error: null,
        setToken: (token) => set({ token }),
        setUser: (user) => set({ user }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        login: (token, user) => set({ token, user, error: null }),
        logout: () => set({ token: null, user: null, error: null }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          token: state.token,
          user: state.user,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

// ==================== Movie Store ====================
export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  rating: number;
  releaseDate: string;
  genre: string[];
}

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  setMovies: (movies: Movie[]) => void;
  setSelectedMovie: (movie: Movie | null) => void;
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMovieStore = create<MovieState>()(
  devtools(
    persist(
      (set) => ({
        movies: [],
        selectedMovie: null,
        favorites: [],
        isLoading: false,
        error: null,
        setMovies: (movies) => set({ movies }),
        setSelectedMovie: (movie) => set({ selectedMovie: movie }),
        addFavorite: (movieId) =>
          set((state) => ({
            favorites: [...new Set([...state.favorites, movieId])],
          })),
        removeFavorite: (movieId) =>
          set((state) => ({
            favorites: state.favorites.filter((id) => id !== movieId),
          })),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'movie-storage',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          favorites: state.favorites,
        }),
      }
    ),
    { name: 'MovieStore' }
  )
);

// ==================== Onboarding Store ====================
export interface OnboardingState {
  hasOnboarded: boolean;
  setHasOnboarded: (value: boolean) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    persist(
      (set) => ({
        hasOnboarded: false,
        selectedGenres: [],
        setHasOnboarded: (hasOnboarded) => set({ hasOnboarded }),
        setSelectedGenres: (genres) => set({ selectedGenres: genres }),
      }),
      {
        name: 'onboarding-storage',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          hasOnboarded: state.hasOnboarded,
          selectedGenres: state.selectedGenres,
        }),
      }
    ),
    { name: 'OnboardingStore' }
  )
);

// ==================== Permissions Store ====================
export interface PermissionsState {
  camera: boolean;
  microphone: boolean;
  location: boolean;
  hasRequestedPermissions: boolean;
  setCameraPermission: (granted: boolean) => void;
  setMicrophonePermission: (granted: boolean) => void;
  setLocationPermission: (granted: boolean) => void;
  setHasRequestedPermissions: (value: boolean) => void;
  setAllPermissions: (camera: boolean, microphone: boolean, location: boolean) => void;
  resetPermissions: () => void;
  checkAllPermissionsGranted: () => boolean;
}

export const usePermissionsStore = create<PermissionsState>()(
  devtools(
    persist(
      (set, get) => ({
        camera: false,
        microphone: false,
        location: false,
        hasRequestedPermissions: false,
        
        setCameraPermission: (granted) => set({ camera: granted }),
        setMicrophonePermission: (granted) => set({ microphone: granted }),
        setLocationPermission: (granted) => set({ location: granted }),
        setHasRequestedPermissions: (value) => set({ hasRequestedPermissions: value }),
        
        setAllPermissions: (camera, microphone, location) => 
          set({ camera, microphone, location }),
        
        resetPermissions: () => set({
          camera: false,
          microphone: false,
          location: false,
          hasRequestedPermissions: false,
        }),
        
        checkAllPermissionsGranted: () => {
          const state = get();
          return state.camera && state.microphone && state.location;
        },
      }),
      {
        name: 'permissions-storage',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          camera: state.camera,
          microphone: state.microphone,
          location: state.location,
          hasRequestedPermissions: state.hasRequestedPermissions,
        }),
      }
    ),
    { name: 'PermissionsStore' }
  )
);

// ==================== UI Store ====================
export interface UIState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        isDarkMode: false,
        toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      }),
      {
        name: 'ui-storage',
        storage: createJSONStorage(() => AsyncStorage),
      }
    ),
    { name: 'UIStore' }
  )
);

// ==================== Search/Filter Store ====================
// export interface SearchState {
//   searchQuery: string;
//   filters: {
//     genre?: string[];
//     rating?: number;
//     year?: number;
//   };
//   setSearchQuery: (query: string) => void;
//   setFilters: (filters: SearchState['filters']) => void;
//   clearFilters: () => void;
// }

// export const useSearchStore = create<SearchState>()(
//   devtools(
//     (set) => ({
//       searchQuery: '',
//       filters: {},
//       setSearchQuery: (searchQuery) => set({ searchQuery }),
//       setFilters: (filters) => set({ filters }),
//       clearFilters: () => set({ filters: {} }),
//     }),
//     { name: 'SearchStore' }
//   )
// );


export interface SearchFilters {
  genres: string[];
  type: "all" | "movie" | "person";
  sortBy?: "Most Popular" | "Newest" | "Highest Rated";
  year?: number;
  rating?: number;
}

export interface SearchState {
  searchQuery: string;
  filters: SearchFilters;

  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  resetAll: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    devtools((set) => ({
      searchQuery: "",
      filters: {
        genres: [],
        type: "all",
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      setFilters: (filters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),

      clearFilters: () =>
        set((state) => ({
          filters: {
            ...state.filters,
            genres: [],
            sortBy: undefined,
            year: undefined,
            rating: undefined,
          },
        })),

      resetAll: () =>
        set({
          searchQuery: "",
          filters: {
            genres: [],
            type: "all",
          },
        }),
    })),
    { name: "search-store" }
  )
);


// export interface SearchFilters {
//   genres: string[];
//   type: "all" | "movie" | "person";
//   sortBy?: "Most Popular" | "Newest" | "Highest Rated";
//   year?: number;
//   rating?: number;
// }

// export interface SearchState {
//   searchQuery: string;
//   filters: SearchFilters;

//   setSearchQuery: (query: string) => void;
//   setFilters: (filters: Partial<SearchFilters>) => void;
//   clearFilters: () => void;
//   resetAll: () => void;
// }

// export const useSearchStore = create<SearchState>()(
//   persist(
//     devtools(
//       (set) => ({
//         searchQuery: "",
//         filters: {
//           genres: [],
//           type: "all",
//         },

//         setSearchQuery: (searchQuery) => set({ searchQuery }),

//         setFilters: (filters) =>
//           set((state) => ({
//             filters: {
//               ...state.filters,
//               ...filters,
//             },
//           })),

//         clearFilters: () =>
//           set((state) => ({
//             filters: {
//               ...state.filters,
//               genres: [],
//               sortBy: undefined,
//               year: undefined,
//               rating: undefined,
//             },
//           })),

//         resetAll: () =>
//           set({
//             searchQuery: "",
//             filters: {
//               genres: [],
//               type: "all",
//             },
//           }),
//       }),
//       { name: "SearchStore" }
//     ),
//     {
//       name: "search-store",
//       storage: createJSONStorage(() => AsyncStorage),
//       skipHydration: true, 
//     }
//   )
// );