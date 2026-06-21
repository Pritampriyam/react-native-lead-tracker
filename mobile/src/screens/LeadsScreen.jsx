import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import LeadCard from "../components/LeadCard";
import { useLeads } from "../context/LeadsContext";
import EmptyState from "../components/EmptyState";
import { useEffect } from "react";
import socket from "../services/socketService";

import Header from "../components/Header";


const LeadsScreen = () => {
  const { leads, addLead } = useLeads();
  useEffect(() => {
    socket.connect();

    const handleNewLead = (lead) => {
      console.log("New Lead:", lead);
      addLead(lead);
    };

    socket.on("newLead", handleNewLead);

    return () => {
      socket.off("newLead", handleNewLead);
      socket.disconnect();
    };
  }, []);



  return (
    <SafeAreaView>
      <Header />

      {leads.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LeadCard
              name={item.name}
              email={item.email}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default LeadsScreen;