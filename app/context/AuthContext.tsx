"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import firebase_app from "@/firebase/clientApp";

const auth = firebase_app.auth();

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

type Props = {
  children?: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase_app.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
