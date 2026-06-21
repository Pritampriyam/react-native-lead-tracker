import React, { createContext, useContext, useState } from "react";

const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

  const addLead = (lead) => {
    setLeads((prev) => [lead, ...prev]);
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        addLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  return useContext(LeadsContext);
};