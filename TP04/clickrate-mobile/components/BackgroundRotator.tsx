import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Animated } from "react-native";

const images = [
  require("../assets/img/background/dust2_back_plat_s2.png"),
  require("../assets/img/background/dust2_blue_s2.png"),
  require("../assets/img/background/dust2_double_doors_s2.png"),
  require("../assets/img/background/nuke_ramp_s2.jpg"),
  require("../assets/img/background/overpass_van_vista_s2.jpg"),
  require("../assets/img/background/nuke_t_s2.jpg"),
];

interface Props {
  children: React.ReactNode;
  activar?: boolean; // <- IMPORTANTE solo rota con TRUE
}

export default function BackgroundRotator({ children, activar=false }: Props) {

  const [index, setIndex] = useState(0);
  const fade= new Animated.Value(1);

  useEffect(() => {
    if (!activar) return;     // <--no rota en la animacion de inicio

    const interval = setInterval(() => {
      Animated.timing(fade, { toValue: 0, duration: 1500, useNativeDriver: true }).start(() => {
      setIndex((prev) => (prev + 1) % images.length);
      Animated.timing(fade, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [activar]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fade }}>
          <ImageBackground
            source={images[index]}
            style={styles.background}
            resizeMode="cover"
          >
            {children}
          </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgImage: {
    opacity: 0.85, 
  },
});