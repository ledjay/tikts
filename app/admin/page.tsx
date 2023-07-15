"use client";
import React, { useEffect, useState } from "react";
import LogOut from "../components/LogOut";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import AddTickt from "../components/AddTickt";
import TiktsList from "../components/TiktsList";
import TiktCard from "../components/TiktCard";
import VocalTickt from "../components/VocalTickt";

export default function Page() {
  const [tikts, setTikts] = useState([]);

  const { user }: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);
  return (
    <div className="w-full ">
      <AddTickt tikts={tikts} setTikts={setTikts} />
      <LogOut />
      <TiktsList tikts={tikts} setTikts={setTikts} />
      <VocalTickt tikts={tikts} setTikts={setTikts} />
    </div>
  );
}
