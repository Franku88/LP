import { View, StyleSheet } from "react-native";
type MainLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function MainLayout({ children, sidebar }: MainLayoutProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.main}>{children}</View>

      {sidebar && (
        <View style={styles.sidebar}>
          {sidebar}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
  },

  main: {
    flex: 1,
  },

  sidebar: {
    width: 64,
    alignItems: "center",
    paddingTop: 60,
  },
});
