import React from "react";
import { ScrollView, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function Scrollable({ children }: Props) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  content: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 24,
  },
});