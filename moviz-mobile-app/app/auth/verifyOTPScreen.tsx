import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingOverlay from '../../src/components/LoadingOverlay';
import { useAuth } from '../../src/store/hooks';
const colors = require('../../src/constants/colors');

const DIGITS = 5;
const RESEND_TIMEOUT = 60;

export default function VerifyOTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const flow = (params?.flow as string) || undefined;
  const resetEmail = (params?.resetEmail as string) || undefined;
  const { login, setLoading, setError, isLoading } = useAuth();

  const [code, setCode] = useState<string[]>(Array(DIGITS).fill(''));
  const [countdown, setCountdown] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      countdownInterval.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return RESEND_TIMEOUT;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, [countdown, canResend]);

  const focusTo = (index: number) => {
    const input = inputsRef.current[index];
    if (input) input.focus();
  };

  const handleChange = (text: string, index: number) => {
    if (!text) return;
    const digit = text.slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    const nextIndex = index + 1;
    if (nextIndex < DIGITS) {
      focusTo(nextIndex);
    } else {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace') {
      if (code[index]) {
        const next = [...code];
        next[index] = '';
        setCode(next);
      } else if (index > 0) {
        focusTo(index - 1);
        const next = [...code];
        next[index - 1] = '';
        setCode(next);
      }
    }
  };

  const handlePaste = async (event: any) => {
    try {
      const text = event?.nativeEvent?.text || '';
      if (text.length >= DIGITS) {
        const chars = text.slice(0, DIGITS).split('');
        setCode(chars);
        Keyboard.dismiss();
      }
    } catch (e) {}
  };

  const isCodeComplete = code.every((digit) => digit.length > 0);

  const handleSubmit = async () => {
    const otp = code.join('');
    if (otp.length !== DIGITS) return;
    try {
      setLoading(true);
      const demoUser = { id: 'local', username: 'Demo', email: '' };
      login('demo-token', demoUser);
      if (flow === 'resetPassword') {
        // go to new password screen when resetting password
        router.replace({ pathname: '/auth/newPassword', params: { resetEmail } });
      } else if (flow === 'signup') {
        router.replace('/genrePreferenceScreen');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setCanResend(false);
    setCountdown(RESEND_TIMEOUT);
    setCode(Array(DIGITS).fill(''));
    focusTo(0);
  };

  return (
    <LinearGradient
      colors={[colors.bgDark, colors.bgDeep, colors.purpleDeep]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <LoadingOverlay visible={isLoading} />

        <View style={styles.illustrationWrap}>
          <Image source={require('../../assets/images/verifyImg.png')} style={styles.illustration} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP Now</Text>
          <Text style={styles.subtitle}>Enter the {DIGITS}-digit code we have sent to your Email</Text>
        </View>

      <View style={styles.otpRow}>
        {Array.from({ length: DIGITS }).map((_, i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputsRef.current[i] = ref)}
            style={styles.otpInput}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={1}
            value={code[i]}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            textContentType="oneTimeCode"
            importantForAutofill="yes"
            onEndEditing={handlePaste}
            placeholderTextColor="#999"
          />
        ))}
      </View>

      <TouchableOpacity 
        onPress={handleSubmit} 
        style={styles.submitWrapper} 
        activeOpacity={0.9}
        disabled={!isCodeComplete}
      >
        <LinearGradient 
          colors={isCodeComplete ? [colors.purple, colors.purpleDeep] : [colors.inactive, colors.inactive]}
          style={styles.submitButton} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.submitText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={handleResend} disabled={!canResend}>
          <Text style={[styles.link, { opacity: canResend ? 1 : 0.5 }]}>
            {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
          </Text>
        </TouchableOpacity>
      </View>
        </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: colors.brandYellow,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 12,
    marginHorizontal: 16,
    marginBottom: 28,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: colors.inputBg,
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: '#000',
  },
  submitWrapper: {
    marginHorizontal: 24,
  },
  submitButton: {
    height: 50,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: colors.submitText,
    fontWeight: '600',
    fontSize: 16,
  },
  actionsRow: {
    marginTop: 16,
    alignItems: 'center',
  },
  link: {
    color: colors.link,
  },
  gradient: { flex: 1 },
  illustrationWrap: { alignItems: 'center', marginBottom: 18, marginTop: 36 },
  illustration: { width: 140, height: 140, resizeMode: 'contain' },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});