import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LeadCard = ({ name, email }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    marginTop: 4,
  },
});

export default LeadCard;