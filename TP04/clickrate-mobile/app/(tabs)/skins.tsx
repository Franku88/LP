import { useEffect, useRef, useState } from "react";
import {View,Text,Image,StyleSheet,FlatList,Animated,Pressable,ActivityIndicator,} from "react-native";
import {useSplash} from "../context/SplashContext";
import BackgroundRotator from "@/components/BackgroundRotator";
import Main from "@/components/Main";

type Skin = {
  id: number;
  name: string;
  weapon: string;
  category: string;
  rarity: {
    name: string;
    color: string;
  };
};

export default function Skins() {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://127.0.0.1:3000";

  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/api/skins?page=${page}&limit=${perPage}`)
      .then(res => res.json())
      .then(json => {
        setSkins(json.data);
        setTotalPages(json.totalPages);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando skins:", err);
        setLoading(false);
      });
  }, [page]);

  const renderSkin = ({ item }: { item: Skin }) => (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: item.rarity.color },
      ]}
    >
      <Image
        source={{ uri: `${BASE_URL}/api/skin-img/${item.id}` }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Arma: {item.weapon}</Text>
        <Text>Categoría: {item.category}</Text>
        <Text>Rareza: {item.rarity.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <BackgroundRotator activar={true}></BackgroundRotator>
      <Main>
            <View style={styles.container}>
              <Text style={styles.title}>Skins</Text>

              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <FlatList
                  data={skins}
                  renderItem={renderSkin}
                  keyExtractor={item => item.id.toString()}
                  numColumns={4}//4 items por columna
                  columnWrapperStyle={{ justifyContent:"space-between",marginBottom:12, gap: 12 }}
                  contentContainerStyle={{ paddingBottom: 100,gap: 12 }}
                />
              )}

              <View style={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Pressable
                    key={p}
                    onPress={() => setPage(p)}
                    style={[
                      styles.pageButton,
                      p === page && styles.pageSelected,
                    ]}
                  >
                    <Text style={styles.pageText}>{p}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
      </Main>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  card: {
    width: "45%", 
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
  },

  info: {
    alignItems: "center",
    marginTop: 8,
  },

  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginVertical: 16,
  },

  pageButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },

  pageSelected: {
    backgroundColor: "#A38A5F",
  },

  pageText: {
    fontWeight: "bold",
  },
});