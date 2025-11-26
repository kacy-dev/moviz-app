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
}

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    persist(
      (set) => ({
        hasOnboarded: false,
        setHasOnboarded: (hasOnboarded) => set({ hasOnboarded }),
      }),
      {
        name: 'onboarding-storage',
        storage: createJSONStorage(() => AsyncStorage),
      }
    ),
    { name: 'OnboardingStore' }
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
export interface SearchState {
  searchQuery: string;
  filters: {
    genre?: string[];
    rating?: number;
    year?: number;
  };
  setSearchQuery: (query: string) => void;
  setFilters: (filters: SearchState['filters']) => void;
  clearFilters: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      searchQuery: '',
      filters: {},
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilters: (filters) => set({ filters }),
      clearFilters: () => set({ filters: {} }),
    }),
    { name: 'SearchStore' }
  )
);
