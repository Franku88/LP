



import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import {useRouter} from "expo-router";

export default function Header() {
  const router=useRouter(); 
  return (
    <View style={styles.container}>
      <View style={styles.navtop}>
        {/* LOGO */}
        <Pressable style={styles.logo}>
          <Image
            source={require("../assets/img/ClickRateImagotipo.png")}
            style={styles.logoImg}
          />
        </Pressable>

        {/* LINKS */}
        <View style={styles.navLinks}>
          <Pressable style={styles.navButton} onPress={()=> router.replace("/(tabs)/skins")}>
            <Text style={styles.navText}>Skins</Text>
          </Pressable>
          <Pressable style={styles.navButton} onPress={()=> router.replace("/(tabs)/tienda")}>
            <Text style={styles.navText}>Tienda</Text>
          </Pressable>
          <Pressable style={styles.navButton } onPress={()=> router.replace("/(tabs)/inventario")}>
            <Text style={styles.navText}>Inventario</Text>
          </Pressable>
        </View>

        {/* USER */}
        <View style={styles.userMenu}>
          <Pressable>
            <Image
              source={require("../assets/img/usuarioLogo.png")}
              style={styles.userIcon}
            />
          </Pressable>

          <View style={styles.dropdown}>
            <Pressable style={styles.dropdownItem}>
              <Text>Ingresar</Text>
            </Pressable>
            <Pressable style={styles.dropdownItem}>
              <Text>Registrarse</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A38A5F",
    padding: 8,
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: "#C0A17A",
    borderLeftColor: "#C0A17A",
    borderBottomColor: "#5C462F",
    borderRightColor: "#5C462F",
  },

  navtop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    padding: 5,
  },

  logoImg: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    borderRadius: 8,
  },

  navLinks: {
    flexDirection: "row",
    gap: 12,
  },

  navButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#A38A5F",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: "#b4a695",
    borderLeftColor: "#b4a695",
    borderBottomColor: "#5C462F",
    borderRightColor: "#5C462F",
  },

  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  userMenu: {
    position: "relative",
  },

  userIcon: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },

  dropdown: {
    position: "absolute",
    top: 70,
    right: 0,
    backgroundColor: "#A38A5F",
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 5,
  },

  dropdownItem: {
    padding: 8,
  },
});