import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderNav from '@/src/components/HeaderNav';
const colors = require("@/src/constants/colors");

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <HeaderNav headerTitle={"Movie details"} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:  colors.bgDark,
  },
});
