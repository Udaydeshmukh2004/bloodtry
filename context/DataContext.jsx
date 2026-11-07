"use client"

// Create a new file (e.g., DataContext.js)
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [arrData, setArrData] = useState([]);
  const [currUser, setCurrUser] = useState(undefined);
  
  // const callApi = async()=>{
  //     const res = fetch('api/')
  // }
  const updateArrData = newData => {
    setArrData(newData);
  };

  const updatecurrUser =()=>{
    setCurrUser(undefined);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/current');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setCurrUser(data.user);
        console.log(currUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <DataContext.Provider value={{ arrData, updateArrData, currUser, updatecurrUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
