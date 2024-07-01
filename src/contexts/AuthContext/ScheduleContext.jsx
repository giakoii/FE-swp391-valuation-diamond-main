import React, { createContext, useState, useContext } from 'react';

const ScheduleContext = createContext();

export const useSchedule = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const [manageScheduleCount, setManageScheduleCount] = useState(0);

  return (
    <ScheduleContext.Provider value={{ manageScheduleCount, setManageScheduleCount }}>
      {children}
    </ScheduleContext.Provider>
  );
};
