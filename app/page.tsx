"use client";
import firebase_app from "@/firebase/clientApp";
import React from "react";
import signUp from "@/firebase/signup";
import signIn from "@/firebase/signin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { error } from "console";

export default function Home() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  console.log(router);

  const handleForm = async (event: any) => {
    event.preventDefault();
    if (mode === "login") {
      logIn(email, password);
    }
    if (mode === "signup") {
      createAcount(email, password);
    }
  };

  const logIn = async (email: string, password: string) => {
    const { result, error } = await signIn(email, password);
    if (error) {
      setError(error.code);
      return console.log(error.code);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  const createAcount = async (email: string, password: string) => {
    const { result, error } = await signUp(email, password);
    if (error) {
      setError(error.code);
      return console.log(error.code);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };

  return (
    <div className=" ">
      <div className="border w-full max-w-2xl rounded-xl shadow-md p-10 bg-gradient-to-b from-white to-slate-50  ">
        <div className="tabs w-full flex justify-stretch">
          <a
            className={`tab tab-bordered tab-lg ${
              mode === "login" ? "tab-active" : ""
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </a>
          <a
            className={`tab tab-bordered tab-lg ${
              mode === "signup" ? "tab-active" : ""
            }`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </a>
          <hr className="grow" />
        </div>{" "}
        {error && (
          <div className="alert alert-error mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {error === "auth/user-not-found" ? (
                <>
                  No account found for your e-mail.
                  <br /> Maybe you want to{" "}
                  <a
                    className="underline cursor-pointer"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                    }}
                  >
                    Create an account
                  </a>
                </>
              ) : (
                ""
              )}

              {error === "auth/email-already-in-use" ? (
                <>
                  You seem to already have an accout!
                  <br /> Maybe you want to{" "}
                  <a
                    className="underline cursor-pointer"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                    }}
                  >
                    Log-in
                  </a>
                  ?
                </>
              ) : (
                ""
              )}

              {error === "auth/weak-password" ? (
                <>Please provide a password with at least 6 characters</>
              ) : (
                ""
              )}
              {error === "auth/wrong-password" ? (
                <>Are you sure about your password ?</>
              ) : (
                ""
              )}
            </span>
          </div>
        )}
        <form onSubmit={handleForm} className="form flex flex-col gap-4 py-4 ">
          <label htmlFor="email" className="flex gap-4 items-center">
            <span className=" hidden md:block w-1/4">Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="input input-bordered w-full "
            />
          </label>
          <label htmlFor="password" className="flex gap-4 items-center">
            <span className=" hidden md:block w-1/4">Password</span>
            <span className="w-full block">
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="input input-bordered w-full"
              />
              {mode === "login" ? (
                <>Oups I forgot my password</>
              ) : (
                <>6 characters minimum</>
              )}
            </span>
          </label>
          <button className="btn btn-primary text-white" type="submit">
            {mode === "login" ? "Log in" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
