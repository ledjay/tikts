import React from "react";
import { useState, useEffect } from "react";
import { addData, editData } from "@/firebase/addData";
import { useAuthContext } from "../context/AuthContext";
import { fetchTikts } from "@/firebase/fetchData";
import TiktCard from "./TiktCard";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="flex flex-col gap-4 pb-20 pt-4">
      <AnimatePresence>
        {tikts.map((tikt: any) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            key={tikt.createdAt}
          >
            <TiktCard
              id={tikt.id}
              vendor={tikt.vendor}
              amount={tikt.amount}
              createdAt={tikt.createdAt}
              status={tikt.status}
              setTikts={setTikts}
            />
          </motion.div>
        ))}
        {tikts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 rounded-md p-4 "
          >
            No tikt for the moment
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
