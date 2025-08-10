"use client";

import { datas } from "@/data/dummyData"; 

export default function Usercard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      {datas.map((data, index) => (
        <div
          key={index}
          className="card w-85 bg-base-100 shadow-md border border-base-200 ms-3 mt-5"
        >
          <div className="card-body">
            <h3 className="card-title text-base text-gray-500">{data.title}</h3>
            <h5 className="text-3xl font-bold text-primary">{data.current}</h5>

            <div className="text-sm text-gray-500 flex justify-between">
              <div>
                <span className="mr-2">
                  Last Month:{" "}
                  <span className="font-semibold text-base-content">
                    {data.previous}
                  </span>
                </span>
              </div>

              <div>
                <span
                  className={
                    data.changeColor== "green"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {data.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
