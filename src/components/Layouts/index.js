import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="px-2 py-2 md:px-32 md:py-10">{children}</div>
    </div>
  );
}

export default Layout;
