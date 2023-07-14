import React from "react";
import { useState, useEffect } from "react";
import { addData, editData } from "@/firebase/addData";
import { useAuthContext } from "../context/AuthContext";
import { fetchTikts } from "@/firebase/fetchData";
import TiktCard from "./TiktCard";
import { AnimatePresence } from "framer-motion";

export default function TiktsList({ tikts, setTikts }: any) {
  const { user }: any = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTikts("tikts", user.uid).then((query) => {
        //console.log(query);

        setTikts(query.result);
      });
    };

    // call the function
    fetchData().catch(console.error);
  }, [user, setTikts]);

  return (
    <div className="flex flex-col gap-4 py-20">
      <AnimatePresence>
        {tikts.map((tikt: any) => (
          <TiktCard
            key={tikt.createdAt}
            vendor={tikt.vendor}
            amount={tikt.amount}
            createdAt={tikt.createdAt}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
