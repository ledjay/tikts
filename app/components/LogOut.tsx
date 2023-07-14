"use client";
import firebase_app from "../../firebase/clientApp";
import "firebase/auth";

const auth = firebase_app.auth();

import React from "react";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <a
        className="btn"
        onClick={() => {
          firebase_app
            .auth()
            .signOut()
            .then(() => {
              return router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        logout
      </a>
    </div>
  );
}
