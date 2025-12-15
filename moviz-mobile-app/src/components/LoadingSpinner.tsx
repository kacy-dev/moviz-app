import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function LoadingSpinner() {
  const rotateAnim1 = useRef(new Animated.Value(0)).current;
  const rotateAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // First half circle spinning clockwise
    Animated.loop(
      Animated.timing(rotateAnim1, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();

    // Second half circle spinning counter-clockwise
    Animated.loop(
      Animated.timing(rotateAnim2, {
        toValue: -1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim1, rotateAnim2]);

  const spin1 = rotateAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spin2 = rotateAnim2.interpolate({
    inputRange: [-1, 0],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          styles.spinnerHalf1,
          { transform: [{ rotate: spin1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.spinner,
          styles.spinnerHalf2,
          { transform: [{ rotate: spin2 }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderTopColor: '#A020F0',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  spinnerHalf1: {
    borderTopColor: '#A020F0',
  },
  spinnerHalf2: {
    borderBottomColor: '#A020F0',
  },
});
