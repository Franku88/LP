import React from "react";
import { View, StyleSheet } from "react-native";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return <View style={styles.main}>{children}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    width: "70%",
    alignSelf: "center",
    flexDirection:"column",
    
    padding: 20,
    backgroundColor: "#A38A5F",

    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,

    borderTopColor: "#b4a695",
    borderLeftColor: "#b4a695",
    borderBottomColor: "#5C462F",
    borderRightColor: "#5C462F",

    borderRadius: 8,
  },
});
