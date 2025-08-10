
"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Usercard from "@/components/Usercard"; 
import Link from "next/link";

export default function Dashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "10s", "20s", "30s", "40s", "50s",
          "60s", "70s", "80s", "90s or above"
        ],
        datasets: [
          {
            label: "Male",
            data: [25, 95, 150, 238, 193, 147, 56, 23, 7],
            backgroundColor: "orange"
          },
          {
            label: "Female",
            data: [30, 112, 195, 340, 245, 186, 134, 35, 14],
            backgroundColor: "lightblue"
          },
          {
            label: "Transgender",
            data: [5.4, 12, 4, 75, 10, 5, 3, 1, 0],
            backgroundColor: "pink"
          },
          {
            label: "No option",
            data: [2, 5, 3, 25, 6, 4, 2, 1, 0],
            backgroundColor: "gray"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Users By Age and Gender",
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: "Age Groups"
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 1200,
            title: {
              display: true,
              text: "Number of People"
            }
          }
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content">
          <Usercard />

          <div
            className="mt-5 bg-white p-4 rounded shadow"
            style={{ height: "400px" }}
          >
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side overflow-y-hidden">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <Link href="/dashboard"  className="text-black no-underline" style={{textDecoration: "none"}}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/registered_users" className="text-black no-underline">
                Registered Users
              </Link>
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
