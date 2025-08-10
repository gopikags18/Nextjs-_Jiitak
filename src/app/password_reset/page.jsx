"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { users } from "@/data/dummyUsers"; 


export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  const router = useRouter();

  const handleMail = (e) => {
    e.preventDefault();
    setLoading(true);

    const mail = users.find((u) => u.email == email);

    try {
      if (mail) {
        localStorage.setItem("emailReset", email);
        setInputError(false);
        toast.success("Password Reset Link Sent Successfully!");
        setTimeout(() => router.push("/new_password"), 1500);
      } else {
        setInputError(true);
        toast.error("Invalid Email or Email Not Found!!");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-center text-4xl">Reset Password</h2>
      <p className="text-center text-small mt-3">
        Please enter your registered email address. <br />
        A URL to reset your password will be sent.
      </p>
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
          {inputError && (
            <p className="text-red-500 text-sm mt-1">
              Email not found. Please check again.
            </p>
          )}

          <button
            onClick={handleMail}
            disabled={!email || loading}
            className={`${
              !email
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white font-semibold py-2 px-4 rounded mt-4`}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Password Reset Link"
            )}
          </button>

          <p className="text-center mt-4">
            Go back to{" "}
            <Link href="/" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}
