# Zustand State Management Setup - Production Guide

## 📋 Overview

This guide covers the robust Zustand setup for the Moviz movie app. Zustand is a lightweight, performant state management library perfect for commercial React Native applications.

## 🏗️ Architecture

### Store Slices

Your app includes 5 specialized store slices:

| Store | Purpose | Persisted |
|-------|---------|-----------|
| **AuthStore** | User authentication, token, user data | ✅ (token & user) |
| **MovieStore** | Movies list, selected movie, favorites | ✅ (favorites) |
| **OnboardingStore** | Onboarding completion status | ✅ (all) |
| **UIStore** | Theme/dark mode preferences | ✅ (all) |
| **SearchStore** | Search queries and filters | ❌ (session only) |

## 📁 File Structure

```
src/store/
├── index.ts              # Main store definitions and types
├── hooks.ts              # Custom hooks for components
└── USAGE_EXAMPLES.md     # Implementation examples
```

## 🔗 Usage Patterns

### 1. Authentication Flow

```typescript
import { useAuth } from '@/src/store/hooks';

function LoginScreen() {
  const { login, logout, isAuthenticated, user, error, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    // Fetch from API
    login(token, user);
  };

  return (
    <View>
      {isAuthenticated ? <LoggedInUI /> : <LoginForm />}
    </View>
  );
}
```

### 2. Movie Management

```typescript
import { useMovies } from '@/src/store/hooks';

function MovieDetail({ movieId }) {
  const { selectedMovie, setSelectedMovie, addFavorite, removeFavorite, isFavorited } = useMovies();

  const toggleFavorite = () => {
    if (isFavorited(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  return (
    <View>
      {/* Movie details */}
      <Button onPress={toggleFavorite}>
        {isFavorited(movieId) ? '❤️' : '🤍'}
      </Button>
    </View>
  );
}
```

### 3. Protected Navigation

```typescript
import { useAuth } from '@/src/store/hooks';
import { useOnboarding } from '@/src/store/hooks';

function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const { hasOnboarded } = useOnboarding();

  if (!hasOnboarded) return <OnboardingStack />;
  if (!isAuthenticated) return <AuthStack />;
  return <MainStack />;
}
```

### 4. Filtering & Search

```typescript
import { useSearch } from '@/src/store/hooks';

function SearchScreen() {
  const { searchQuery, setSearchQuery, filters, setFilters } = useSearch();

  return (
    <View>
      <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
      <FilterPanel onFiltersChange={setFilters} />
    </View>
  );
}
```

## ⚙️ Advanced Features

### Devtools Integration

All stores include Zustand devtools middleware for debugging:

1. Install Redux DevTools browser extension
2. In development, stores will be visible in Redux DevTools
3. View state changes, time-travel debug, and export/import state

### Persistence Configuration

Each store uses selective persistence:

```typescript
partialize: (state) => ({
  token: state.token,
  user: state.user,
})
```

Only specified fields are saved to AsyncStorage, reducing storage size and improving performance.

### Error Handling Pattern

All stores include error management:

```typescript
const { error, setError, clearError } = useAuth();

try {
  // Operation
} catch (err) {
  setError(err.message);
}
```

## 🔄 Data Flow Example

```
Component
    ↓
useAuth hook (from src/store/hooks.ts)
    ↓
useAuthStore selector (from src/store/index.ts)
    ↓
Zustand store with persist middleware
    ↓
AsyncStorage (for persistence)
```

## 💾 AsyncStorage Keys

The following keys are automatically managed:

- `auth-storage` – Authentication data
- `movie-storage` – Movie favorites and history
- `onboarding-storage` – Onboarding status
- `ui-storage` – UI preferences
- `search-storage` (non-persisted) – Session search data

## 🚀 Performance Optimizations

1. **Selector-based subscriptions**: Only re-render when selected state changes
2. **Partial persistence**: Only store essential data
3. **Devtools in production**: Disabled in production builds
4. **Shallow equality**: Zustand uses shallow equality by default

## 🔐 Security Considerations

For sensitive data:

1. **Auth tokens**: Consider encryption middleware for production
2. **User data**: Validate before storing
3. **AsyncStorage**: Not encrypted by default; use `react-native-keychain` for highly sensitive data

Example with encryption:

```typescript
import RNKeychain from 'react-native-keychain';

// Store sensitive data
await RNKeychain.setGenericPassword('token_key', token);

// Retrieve sensitive data
const credentials = await RNKeychain.getGenericPassword();
```

## 📊 Monitoring & Analytics

Track state changes for analytics:

```typescript
import { useShallow } from 'zustand/react';

useAuthStore.subscribe((state, prevState) => {
  if (state.token !== prevState.token) {
    analytics.logEvent('user_logged_in');
  }
});
```

## 🧪 Testing

### Unit Testing Stores

```typescript
import { useAuthStore } from '@/src/store';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null });
  });

  it('should login user', () => {
    const { login, token } = useAuthStore.getState();
    login('test_token', { id: '1', username: 'test' });
    expect(useAuthStore.getState().token).toBe('test_token');
  });
});
```

## 🔄 Migration Strategy

To migrate existing components to Zustand:

1. Identify local `useState` instances managing app-wide state
2. Replace with appropriate store hooks
3. Remove prop-drilling, pass store data directly
4. Test thoroughly
5. Commit incrementally

Example migration:

```typescript
// Before: Prop drilling
function AppNavigator({ isLoggedIn, user, onLogin }) {
  return <HomeStack user={user} />;
}

// After: Using store
function AppNavigator() {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated ? <HomeStack /> : <AuthStack />;
}
```

## 📚 Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## ✅ Checklist for Implementation

- [ ] Review all store definitions in `src/store/index.ts`
- [ ] Review custom hooks in `src/store/hooks.ts`
- [ ] Identify components to migrate to Zustand
- [ ] Replace `useState` with store hooks
- [ ] Test authentication flow
- [ ] Test persistence (kill app and verify data persists)
- [ ] Enable Redux DevTools for debugging
- [ ] Monitor performance with React DevTools Profiler
- [ ] Document any custom store logic for team
- [ ] Set up automated tests for stores

---

**Last Updated**: November 26, 2025
