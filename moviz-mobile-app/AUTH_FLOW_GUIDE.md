# Auth Flow Implementation Guide - Complete Checklist

## Current Status
✅ **Completed:**
- Login screen with loading overlay and Zustand integration
- SignUp screen with loading overlay  
- VerifyOtpScreen with countdown timer and dynamic button colors (#8C8C8C inactive → gradient active)
- SuccessScreen with image and proceed button
- LoadingOverlay component with spinning half-circles

❌ **Pending:**
1. Fix ForgotPassword screen routing and flow
2. Create genrePreference screen (select 5 genres, button inactive #8C8C8C → active gradient)
3. Create newPassword screen for reset password flow
4. Wire "Forgot password?" link in login to route to `/auth/forgotPassword`
5. Fix signup flow: signup → genrePreference → success
6. Update verify screen to handle both OTP verify and reset password flows

---

## Implementation Steps

### Step 1: Complete ForgotPassword Screen
**File:** `app/auth/forgotPassword.tsx`

**Key Features:**
- Image at top (forgotPassImg.png from assets)
- Email input
- "Send Reset Code" button
- Routes to `/auth/verifyOtpScreen` with params: `{ resetEmail: email, flow: "resetPassword" }`
- "Back to Login" link

**Code Pattern:**
```tsx
const handleSubmit = async () => {
  router.push({
    pathname: "/auth/verifyOtpScreen",
    params: { resetEmail: email, flow: "resetPassword" },
  });
};
```

---

### Step 2: Create genrePreference Screen
**File:** `app/genrePreference.tsx` (new)

**Key Features:**
- Shows list of genres (mock data or from API)
- User selects exactly 5 genres
- "Continue" button:
  - Inactive (disabled) if < 5 genres selected: `backgroundColor: "#8C8C8C"`
  - Active (enabled) if 5 genres selected: `LinearGradient ["#6A0DAD", "#2C0547"]`
- Routes to `/auth/successScreen` on continue

**Genres Mock Data:**
```tsx
const GENRES = [
  "Action", "Comedy", "Drama", "Horror", "Romance",
  "Sci-Fi", "Thriller", "Animation", "Documentary", "Fantasy"
];
```

**Selection Logic:**
```tsx
const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

const toggleGenre = (genre: string) => {
  if (selectedGenres.includes(genre)) {
    setSelectedGenres(selectedGenres.filter(g => g !== genre));
  } else if (selectedGenres.length < 5) {
    setSelectedGenres([...selectedGenres, genre]);
  }
};

const isButtonActive = selectedGenres.length === 5;
```

**Button Styling:**
```tsx
<LinearGradient
  colors={isButtonActive ? ["#6A0DAD", "#2C0547"] : ["#8C8C8C", "#8C8C8C"]}
  style={styles.button}
>
  <Text style={styles.buttonText}>Continue ({selectedGenres.length}/5)</Text>
</LinearGradient>
```

---

### Step 3: Create newPassword Screen
**File:** `app/auth/newPassword.tsx` (new)

**Key Features:**
- Image at top (newPassImg.png from assets)
- New password input (with show/hide toggle)
- Confirm password input (with show/hide toggle)
- "Update Password" button
- After success: route to `/auth/successScreen` with message "Password updated successfully"

**Password Validation:**
- Minimum 8 characters
- Match confirmation password
- Show error if mismatch

---

### Step 4: Update SignUp Flow
**File:** `app/auth/signUp.tsx`

**Current:**
```tsx
const handleCreateAccount = async () => {
  // ...
  router.replace('/auth/successScreen');
};
```

**Should Be:**
```tsx
const handleCreateAccount = async () => {
  // ...
  // Save user data to Zustand store for genrePreference use
  router.replace('/genrePreference');  // NOT successScreen yet
};
```

---

### Step 5: Update VerifyOtpScreen to Handle Multiple Flows
**File:** `app/auth/verifyOtpScreen.tsx`

**Changes:**
- Read `flow` param: `const { flow } = useLocalSearchParams()`
- If `flow === "resetPassword"`:
  - Route to `/auth/newPassword` after verification
  - Display: "Enter the code sent to your reset email"
- If `flow === "signup"` (if needed):
  - Route to home or success screen
  - Display: "Enter the code sent to your email"

**Code Pattern:**
```tsx
const { flow } = useLocalSearchParams();

const handleSubmit = async () => {
  // Verify OTP with API
  if (flow === "resetPassword") {
    router.replace("/auth/newPassword");
  } else {
    router.replace("/(tabs)/home");
  }
};
```

---

### Step 6: Wire Forgot Password Link in Login
**File:** `app/auth/login.tsx`

**Current:**
```tsx
<TouchableOpacity>
  <Text className="text-[#E8BA00]" style={styles.fgtPassword}>Forgot password?</Text>
</TouchableOpacity>
```

**Should Be:**
```tsx
<TouchableOpacity onPress={() => router.push('/auth/forgotPassword')}>
  <Text className="text-[#E8BA00]" style={styles.fgtPassword}>Forgot password?</Text>
</TouchableOpacity>
```

---

## Complete Auth Flows

### Flow 1: Login
```
Login Screen
    ↓ (submit)
LoadingOverlay shows
    ↓ (success)
SuccessScreen
    ↓ (proceed)
/(tabs)/home
```

### Flow 2: Sign Up
```
SignUp Screen
    ↓ (submit)
LoadingOverlay shows
    ↓ (success)
genrePreference Screen
    ↓ (select 5 genres → continue)
SuccessScreen
    ↓ (proceed)
/(tabs)/home
```

### Flow 3: Forgot Password
```
Login Screen
    ↓ ("Forgot password?" click)
ForgotPassword Screen
    ↓ (enter email → send reset code)
LoadingOverlay shows
    ↓ (email sent)
VerifyOtpScreen (with flow="resetPassword")
    ↓ (enter OTP code)
LoadingOverlay shows
    ↓ (code verified)
newPassword Screen
    ↓ (enter new password → update)
SuccessScreen ("Password updated!")
    ↓ (proceed)
/(tabs)/home
```

---

## Color Reference

| Element | Color | Use |
|---------|-------|-----|
| Primary Gradient | #6A0DAD → #2C0547 | Active buttons, primary actions |
| Inactive Button | #8C8C8C | Disabled buttons (genre selection, OTP) |
| Button Text | #DBD6D6 | All button text |
| Primary Gold | #E8C400 | Titles, highlights |
| Secondary Text | #EFE6FD | Subtitles, descriptions |
| Background | #121212 | Dark theme background |
| Link Color | #9B5DC8 | Links, secondary actions |

---

## Assets Required

Ensure these images exist in `assets/images/`:
- ✅ `logo.png` (used in login/signup)
- ✅ `google.png` (Google sign-up button)
- ✅ `Apple.png` (Apple sign-up button)
- ❓ `forgotPassImg.png` (forgot password screen - TOP IMAGE)
- ❓ `newPassImg.png` (new password screen - TOP IMAGE)  
- ✅ `success.png` (success screen - TOP IMAGE)

**Add missing images before final deployment.**

---

## Next Steps
1. Create genrePreference.tsx with genre selection (inactive/active button logic)
2. Create newPassword.tsx with password reset form
3. Update SignUp flow to route to genrePreference
4. Update VerifyOtpScreen to handle both flows
5. Wire forgot password link in login
6. Test complete flows end-to-end
7. Commit and push all changes

