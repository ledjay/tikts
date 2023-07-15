import React from "react";
import { useState, useEffect, useRef } from "react";
import { addData, editData } from "@/firebase/addData";
import { useAuthContext } from "../context/AuthContext";
import { fetchTikts } from "@/firebase/fetchData";
import IconCancelCircle from "./icons/IconCancelCircle";
import IconCheckCircle from "./icons/IconCheckCircle";
import { motion, AnimatePresence } from "framer-motion";

export default function VocalTickt({ tikts, setTikts }: any) {
  const [modalVisible, setModalVisible] = useState(true);
  const vocalInput: any = useRef();
  const { user }: any = useAuthContext();
  const [amount, setAmout] = useState(10);
  const [vendor, setVendor] = useState("My favourite store");
  const [fullText, setFullText] = useState();

  useEffect(() => {
    console.log(modalVisible);
    if (vocalInput.current) {
      vocalInput.current.focus();
      setTimeout(() => {
        vocalInput.current.click();
      }, 500);
    }
  }, [vocalInput, modalVisible]);

  const handleFullText = async (e: any) => {
    const floatOrNumberRegex = /[+-]?\d+(\.\d+)?/g;
    const textRegex = /[a-zA-Z]+/g;
    const inputValue = e.target.value;
    const checkFloat = inputValue.match(floatOrNumberRegex);
    const checkText = inputValue.match(textRegex);

    console.log(checkText);
    console.log(checkFloat);

    setFullText(e.target.value);

    if (checkFloat) {
      setAmout(checkFloat[0]);
    }
    if (checkText) {
      setVendor(checkText.join(" "));
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      amount: amount,
      vendor: vendor,
      uid: user.uid,
      createdAt: Date.now(),
      status: "active",
    };
    const { result, error } = await editData("tikts", data);

    const fetchData = async () => {
      const data = await fetchTikts("tikts", user.uid).then((query) => {
        setTikts(query.result);
        setModalVisible(false);
      });
    };

    fetchData().catch(console.error);

    if (error) {
      return console.log(error);
    }
  };
  return (
    <>
      {setTikts && modalVisible && (
        <AnimatePresence>
          <span className="bg-slate-800/50 fixed inset-0"></span>
          <motion.form
            key="modall"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="fixed inset-6 bg-white  items-center justify-center flex flex-col gap-7 p-10 rounded-lg shadow-2xl"
          >
            <h2 className="text-3xl uppercase font-bold">Add a new Tikt</h2>
            <input
              type="text"
              ref={vocalInput}
              value={fullText}
              onChange={handleFullText}
              className="input input-bordered w-full "
            />
            <span className="text-xl font-bold">
              {amount} {amount && <>€</>} {vendor}
            </span>
            <div className="flex gap-4 justify-center">
              <IconCancelCircle
                className="w-20 h-20"
                onClick={(e) => {
                  setModalVisible(false);
                }}
              />
              <IconCheckCircle className="w-20 h-20" onClick={handleSubmit} />
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </>
  );
}
