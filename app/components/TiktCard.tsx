import React, { useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { updateData } from "@/firebase/updateData";
import { fetchTikts } from "@/firebase/fetchData";
import { useAuthContext } from "../context/AuthContext";

export default function TiktCard({
  id,
  vendor,
  amount,
  createdAt,
  status,
  setTikts,
}: any) {
  const { user }: any = useAuthContext();

  const [currentStatus, setCurrentStatus] = useState(status);
  const date = new Date(createdAt);
  const formattedDate = dayjs(date).format("MM/DD/YYYY");
  const handleOnCheck = (e: any) => {
    const updateTikt = async () => {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const data = await updateData("tikts", id, "status", newStatus).then(
        () => {
          const fetchData = async () => {
            const data = await fetchTikts("tikts", user.uid).then((query) => {
              setTikts(query.result);
              setCurrentStatus(newStatus);
            });
          };

          fetchData().catch(console.error);
        }
      );
    };

    // call the function
    updateTikt().catch(console.error);
  };
  return (
    <motion.div
      className="flex text-xl border bg-white p-4 rounded-md gap-4"
      onClick={handleOnCheck}
    >
      <input type="checkbox" checked={currentStatus !== "active"} />
      <span>{amount} €</span>
      <span className="grow">{vendor}</span> <span>{formattedDate}</span>
    </motion.div>
  );
}
