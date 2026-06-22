import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{"\uD83D\uDCE5"}</Text>
      </View>
      <Text style={styles.title}>No leads yet</Text>
      <Text style={styles.subtitle}>
        Submit a test lead from Meta&apos;s Lead Testing Tool to see it appear here instantly.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#171A21",
    borderColor: "#2A2F3A",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center",
    maxWidth: 310,
  },
});

export default EmptyState;
