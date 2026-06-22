import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Meta Lead Tracker</Text>
        <Text style={styles.subtitle}>Realtime Lead Monitoring</Text>
      </View>

      <View style={styles.badge}>
        <View style={styles.liveDot} />
        <Text style={styles.badgeText}>LIVE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    backgroundColor: "rgba(34, 197, 94, 0.16)",
    borderColor: "rgba(34, 197, 94, 0.38)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});

export default Header;
