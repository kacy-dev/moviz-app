import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const spin1 = useRef(new Animated.Value(0)).current;
  const spin2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.loop(
          Animated.timing(spin1, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.timing(spin2, {
            toValue: -1,
            duration: 1000,
            useNativeDriver: true,
          })
        ),
      ]).start();
    }
  }, [visible, spin1, spin2]);

  if (!visible) return null;

  const rotate1 = spin1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotate2 = spin2.interpolate({
    inputRange: [0, -1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[
            styles.halfCircle,
            {
              transform: [{ rotate: rotate1 }],
              borderBottomColor: '#6A0DAD',
            },
          ]}
        />
        <Animated.View
          style={[
            styles.halfCircle,
            {
              transform: [{ rotate: rotate2 }],
              borderTopColor: '#A020F0',
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  spinnerContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  halfCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});
