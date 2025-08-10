"use client"; 
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { users } from "@/data/dummyUsers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = users.find(
      (a) => a.email == email && a.password == password
    );

    try {
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        toast.success("Login successful!");
        setInput(false);

        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        toast.error("Invalid Email or Password!");
        setInput(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="mt-20">
        <h2 className="text-center text-2xl">Login into Your Account</h2>

        <div className="flex justify-center items-center">
          <fieldset className="fieldset bg-base-100 rounded-box w-xs border p-4 mt-2">
            <label className="label">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              className="input"
              placeholder="Enter Your Email"
            />
            {input && (
              <p className="text-red-500 text-sm mt-1">
                Incorrect email or password
              </p>
            )}

            <label className="label">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              className="input"
              placeholder="Enter Your Password"
            />
            {input && (
              <p className="text-red-500 text-sm mt-1">
                Incorrect email or password
              </p>
            )}

            <button
              onClick={handleLogin}
              className={`${
                !email || !password
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white font-semibold py-2 px-4 rounded mt-4`}
              disabled={!email || !password || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center mt-4">
              Forgot your password?{" "}
              <Link href="/password_reset" className="text-blue-600 underline">
                Reset here
              </Link>
            </p>
          </fieldset>
        </div>
      </div>
    </>
  );
}
