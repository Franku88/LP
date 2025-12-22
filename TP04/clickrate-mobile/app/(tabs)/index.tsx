import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";

export default function Index() {
  const [mostrarInicio, setMostrarInicio] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.parallel([//entrada
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.loop(// Glow infinito (neón)
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);
 const glowShadow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 30],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

    if (mostrarInicio) {
    return (
      <View style={styles.splash}>
        {/* TEXTO SUPERIOR */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: fadeAnim,
              textShadowRadius: glowShadow,
            },
          ]}
        >
          WELCOME
        </Animated.Text>

        {/* LOGO */}
        <Pressable onPress={() => setMostrarInicio(false)}>
          <Animated.Image
            source={require("../../assets/img/ClickRateSotipo.png")}
            style={[
              styles.logo,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                shadowRadius: glowShadow,
                shadowOpacity: glowOpacity,
              },
            ]}
            resizeMode="contain"
          />
        </Pressable>

        {/* TEXTO INFERIOR */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: fadeAnim,
              textShadowRadius: glowShadow,
            },
          ]}
        >
          CLICKRATE
        </Animated.Text>
      </View>
    );
  }

  return (
    <View style={styles.home}>
      <Text style={styles.homeText}>HOME / INDEX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#38bdf8",
    fontSize: 34,
    marginVertical: 12,
    fontWeight: "bold",

    textShadowColor: "#38bdf8",
    textShadowOffset: { width: 0, height: 0 },
  },
  logo: {
    width: 160,
    height: 160,
    marginVertical: 24,

    shadowColor: "#38bdf8",
    shadowOffset: { width: 0, height: 0 },
    elevation: 20, // Android glow fake
  },
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    fontSize: 24,
  },
});