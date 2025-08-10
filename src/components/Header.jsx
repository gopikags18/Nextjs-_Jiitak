"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn =
    pathname.startsWith("/dashboard") || pathname.startsWith("/registered_users");

  const logout = () => {
    localStorage.removeItem("login");
    router.push("/");
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <Link
          href="/"
          style={{ textDecoration: "none", color: "orange" }}
          className="text-4xl font-bold text-orange-800 ml-4"
        >
          Jiitak
        </Link>

        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="text-6xl text-orange-600"
            >
              <i className="fa-solid fa-circle-user text-3xl"></i>
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
