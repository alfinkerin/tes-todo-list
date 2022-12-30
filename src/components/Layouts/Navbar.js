import React from "react";

export default function Navbar() {
  return (
    <div
      data-cy="header-background"
      className="w-full h-20 bg-[#16ABF8] flex items-center px-2 md:px-32"
    >
      <span data-cy="header-title" className="text-xl font-bold text-white ">
        TO DO LIST APP
      </span>
    </div>
  );
}
