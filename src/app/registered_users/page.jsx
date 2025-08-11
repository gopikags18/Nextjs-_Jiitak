"use client";

import { useState } from "react";
import Link from "next/link";
import { regData } from "@/data/dummyReg"; 
import { Tooltip } from "react-tooltip";

export default function RegisteredUsers() {
  const [searchKey, setSearchKey] = useState("");

  const filteredUsers = regData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Header & Search */}
          <div className="flex justify-between items-center m-3">
            <h3>Registered User List</h3>
            <div className="w-full max-w-sm">
              <label className="input input-bordered flex items-center gap-2">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  className="grow ms-2"
                  placeholder="Search By Name or Email Address"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Table */}
          <div className="m-3">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL no:</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Reg Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-orange-700">
                        No Users Found!
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((users, index) => (
                      <tr key={users.id || index}>
                        <td>{index + 1}</td>
                        <td>{users.name}</td>
                        <td>
                          <span
                            data-tooltip-id={`tooltip-${index}`}
                            data-tooltip-content={users.email}
                          >
                            {users.email.slice(0, 10)}...
                          </span>
                          <Tooltip id={`tooltip-${index}`} place="bottom" />
                        </td>
                        <td>{users.dob}</td>
                        <td>{users.gender}</td>
                        <td>{users.address}</td>
                        <td>{users.regDate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="join float-end">
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              defaultChecked
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="2"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="3"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="..."
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="20"
            />
          </div>
        </div>

        {/* Drawer Side */}
        <div className="drawer-side overflow-y-hidden">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/registered_users">Registered Users</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Administrators</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
