import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LeadCard from "../components/LeadCard";
import { useLeads } from "../context/LeadsContext";
import EmptyState from "../components/EmptyState";
import socket from "../services/socketService";

import Header from "../components/Header";


const LeadsScreen = () => {
  const { leads, addLead } = useLeads();
  const [toastLead, setToastLead] = useState(null);
  const toastAnim = useRef(new Animated.Value(120)).current;
  const addLeadRef = useRef(addLead);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    addLeadRef.current = addLead;
  }, [addLead]);

  useEffect(() => {
    socket.connect();

    const handleNewLead = (lead) => {
      console.log("New Lead:", lead);
      addLeadRef.current(lead);
      setToastLead(lead);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      Animated.spring(toastAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
      }).start();

      toastTimeoutRef.current = setTimeout(() => {
        Animated.timing(toastAnim, {
          toValue: 120,
          duration: 260,
          useNativeDriver: true,
        }).start(() => setToastLead(null));
      }, 3000);
    };

    socket.on("newLead", handleNewLead);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      socket.off("newLead", handleNewLead);
      socket.disconnect();
    };
  }, [toastAnim]);



  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Leads</Text>
          <Text style={styles.statValue}>{leads.length}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Last Lead</Text>
          <Text style={styles.statValueSmall}>{leads.length > 0 ? "Just now" : "Waiting"}</Text>
        </View>
      </View>

      {leads.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LeadCard
              name={item.name}
              email={item.email}
              phone={item.phone}
              createdAt={item.createdAt}
              isLatest={item.id === leads[0]?.id}
            />
          )}
        />
      )}

      {toastLead ? (
        <Animated.View
          style={[
            styles.toast,
            {
              transform: [{ translateY: toastAnim }],
            },
          ]}
        >
          <View style={styles.toastDot} />
          <View style={styles.toastContent}>
            <Text style={styles.toastTitle}>New lead received</Text>
            <Text style={styles.toastSubtitle} numberOfLines={1}>
              {toastLead.name} · {toastLead.email}
            </Text>
          </View>
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#171A21",
    borderColor: "#2A2F3A",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  statValueSmall: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 13,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 124,
    gap: 12,
  },
  toast: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 24,
    backgroundColor: "#171A21",
    borderColor: "#22C55E",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  toastDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22C55E",
  },
  toastContent: {
    flex: 1,
    minWidth: 0,
  },
  toastTitle: {
    color: "#22C55E",
    fontSize: 15,
    fontWeight: "700",
  },
  toastSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 4,
  },
});

export default LeadsScreen;
