import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
const colors = require('../../src/constants/colors');

const { width } = Dimensions.get('window');

export default function SuccessScreen() {
  const router = useRouter();

  const handleProceed = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/success.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Success!</Text>
        <Text style={styles.subtitle}>Your account has been created successfully</Text>
      </View>

      <TouchableOpacity onPress={handleProceed} style={styles.submitWrapper} activeOpacity={0.9}>
        <LinearGradient
          colors={['#6A0DAD', '#2C0547']}
          style={styles.submitButton}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.submitText}>Proceed</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.brandYellow,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 40,
  },
  submitWrapper: {
    width: '100%',
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
});
