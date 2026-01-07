import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

interface MainProps {
  children: React.ReactNode;
}

const { height } = Dimensions.get("window");

export default function Main({ children }: MainProps) {
  return <View style={styles.main}>{children}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,          // 👈 ESTO ES CLAVE
    width: "70%",
    minHeight: height * 0.75,
    alignSelf: "center",

    flexDirection: "column",
    padding: 20,
    backgroundColor: "#A38A5F",
    
    /* separación del header y footer */
    marginTop: 24,
    marginBottom: 24,

    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,

    borderTopColor: "#b4a695",
    borderLeftColor: "#b4a695",
    borderBottomColor: "#5C462F",
    borderRightColor: "#5C462F",

    borderRadius: 8,
    display: "flex",
  },
});
    