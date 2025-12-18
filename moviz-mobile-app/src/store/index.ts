import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  mediaLibrary: boolean;
  hasRequestedPermissions: boolean;
  galleryPermissionRequested: boolean;

  requestCameraAndMic: () => Promise<boolean>;
  requestMediaLibrary: () => Promise<boolean>;
  resetPermissions: () => void;
}

export const usePermissionsStore = create<PermissionsState>()(
  devtools(
    persist(
      (set) => ({
        camera: false,
        microphone: false,
        mediaLibrary: false,
        hasRequestedPermissions: false,
        galleryPermissionRequested: false,

        requestCameraAndMic: async () => {
          try {
            const cameraRes = await Camera.requestCameraPermissionsAsync();
            const micRes = await Camera.requestMicrophonePermissionsAsync();

            const granted =
              cameraRes.status === 'granted' &&
              micRes.status === 'granted';

            set({
              camera: cameraRes.status === "granted",
              microphone: micRes.status === "granted",
              hasRequestedPermissions: true,
            });

            return granted;
          } catch (error) {
            console.log('Permission error:', error);
            return false;
          }
        },

        requestMediaLibrary: async () => {
          const { status } =
            await MediaLibrary.requestPermissionsAsync();

          const granted = status === "granted";

          set({
            mediaLibrary: granted,
            hasRequestedPermissions: true,
          });

          return granted;
        },

        resetPermissions: () =>
          set({
            camera: false,
            microphone: false,
            mediaLibrary: false,
            hasRequestedPermissions: false,
            galleryPermissionRequested: false,
          }),
      }),
      {
        name: "permissions-storage",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          camera: state.camera,
          microphone: state.microphone,
          mediaLibrary: state.mediaLibrary,
          hasRequestedPermissions: state.hasRequestedPermissions,
        }),
      }
    ),
    { name: "PermissionsStore" }
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

// ==================== Feature Onboarding Store ====================
export interface FeatureOnboardingState {
  recordOnboardingSeen: boolean;
  recordPermissionRequested: boolean;
  uploadTipsOnboardingSeen: boolean;
  uploadPermissionRequested: boolean;

  setRecordOnboardingSeen: () => void;
  setRecordPermissionRequested: () => void;
  setUploadTipsOnboardingSeen: () => void;
  setUploadPermissionRequested: () => void;
  resetFeatureOnboarding: () => void;
}

export const useFeatureOnboardingStore = create<FeatureOnboardingState>()(
  devtools(
    persist(
      (set) => ({
        recordOnboardingSeen: false,
        recordPermissionRequested: false,
        uploadTipsOnboardingSeen: false,
        uploadPermissionRequested: false,

        setRecordOnboardingSeen: () =>
          set({ recordOnboardingSeen: true }),

        setRecordPermissionRequested: () =>
          set({ recordPermissionRequested: true }),

        setUploadTipsOnboardingSeen: () =>
          set({ uploadTipsOnboardingSeen: true }),

        setUploadPermissionRequested: () =>
          set({ uploadPermissionRequested: true }),

        resetFeatureOnboarding: () =>
          set({ 
            recordOnboardingSeen: false,
            recordPermissionRequested: false,
            uploadTipsOnboardingSeen: false,
            uploadPermissionRequested: false,
          }),
      }),
      {
        name: "feature-onboarding-storage",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          recordOnboardingSeen: state.recordOnboardingSeen,
          recordPermissionRequested: state.recordPermissionRequested,
          uploadTipsOnboardingSeen: state.uploadTipsOnboardingSeen,
          uploadPermissionRequested: state.uploadPermissionRequested,
        }),
      }
    ),
    { name: "FeatureOnboardingStore" }
  )
);