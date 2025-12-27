import React from 'react';
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSplash } from "../context/SplashContext";

export default function TabsLayout() {
  const { mostrarSplash } = useSplash();

  return (
    <View style={styles.container}>
      {!mostrarSplash && <Header />}

      <View style={styles.content}>
        <Slot />
      </View>

      {!mostrarSplash && <Footer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});