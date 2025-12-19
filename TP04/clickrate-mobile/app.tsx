import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";

export default function App() {
  const [mostrarInicio, setMostrarInicio] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
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
  }, []);

  if (mostrarInicio) {
    return (
      <View style={styles.splash}>
        <Text style={styles.title}>WELCOME</Text>

        <Pressable onPress={() => setMostrarInicio(false)}>
          <Animated.Image
            source={require("./assets/logo.png")}
            style={[
              styles.logo,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
        </Pressable>

        <Text style={styles.title}>CLICKRATE</Text>
        <Text style={styles.hint}>Tap para continuar</Text>
      </View>
    );
  }

  // 👉 Pantalla principal (INDEX)
  return (
    <View style={styles.home}>
      <Text style={styles.homeText}>HOME / INDEX</Text>
    </View>
  );
}