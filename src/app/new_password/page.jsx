"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewPassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirm, setConfirm] = useState("");

  const router = useRouter();

  const setPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");
    setConfirm("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(newPass)) {
      setPasswordError(
        "Password must be 6 characters and include uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    if (newPass !== confirmPass) {
      setConfirm("Passwords Do Not Match!");
      setLoading(false);
      return;
    }

    toast.success("Password Reset Successful!");
    localStorage.removeItem("emailReset");

    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="mt-20">
      <h2 className="text-center">Password Reset</h2>

      <div className="flex justify-center items-center">
        <fieldset className="fieldset bg-base-100 rounded-box w-xs border p-4 mt-2">
          <label className="label mt-4">New Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

          <label className="label">Confirm New Password</label>
          <input
            type="password"
            className="input"
            placeholder="Confirm Your New Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          {confirm && <p className="text-red-500 text-sm mt-1">{confirm}</p>}

          <button
            onClick={setPassword}
            disabled={!newPass || !confirmPass || loading}
            className={`mt-4 text-white font-semibold py-2 px-4 rounded
              ${
                !newPass || !confirmPass
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Set New Password"
            )}
          </button>
        </fieldset>
      </div>
    </div>
  );
}
