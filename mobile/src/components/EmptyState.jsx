import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text>No Leads Yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: "center",
  },
});

export default EmptyState;