import React from "react";
import { useState, useEffect } from "react";
import { addData, editData } from "@/firebase/addData";
import { useAuthContext } from "../context/AuthContext";
import { fetchTikts } from "@/firebase/fetchData";

export default function AddTickt({ tikts, setTikts }: any) {
  const { user }: any = useAuthContext();
  const [amount, setAmout] = useState();
  const [vendor, setVendor] = useState();

  useEffect(() => {
    //console.log(setTikts);
  }, [setTikts]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      amount: amount,
      vendor: vendor,
      uid: user.uid,
      createdAt: Date.now(),
    };
    const { result, error } = await editData("tikts", data);

    const fetchData = async () => {
      const data = await fetchTikts("tikts", user.uid).then((query) => {
        //console.log(query);

        setTikts(query.result);
      });
    };

    // call the function
    fetchData().catch(console.error);

    if (error) {
      return console.log(error);
    }
  };
  return (
    <>
      {setTikts && (
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 items-center border fixed bottom-0 w-full left-0 p-4 bg-white shadow-2xl "
        >
          <input
            type="number"
            value={amount}
            name="amout"
            placeholder="15"
            className="input input-bordered w-full "
            onChange={(e: any) => setAmout(e.target.value)}
          />{" "}
          €
          <input
            type="text"
            value={vendor}
            name="vendor"
            placeholder="My favourite Store"
            className="input input-bordered w-full "
            onChange={(e: any) => setVendor(e.target.value)}
          />
          <button className="w-fit whitespace-nowrap btn btn-primary text-white">
            Add Tickt
          </button>
        </form>
      )}
    </>
  );
}
