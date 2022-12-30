import React from "react";

function CekPriority({ cekPriority }) {
  const color = () => {
    if (cekPriority === "very-high") {
      return <div className="w-4 h-4 bg-[#ED4C5C] rounded-full" />;
    } else if (cekPriority === "high") {
      return <div className="w-4 h-4 bg-[#F8A541] rounded-full" />;
    } else if (cekPriority === "normal") {
      return <div className="w-4 h-4 bg-[#00A790] rounded-full" />;
    } else if (cekPriority === "low") {
      return <div className="w-4 h-4 bg-[#428BC1] rounded-full" />;
    } else if (cekPriority === "very-low") {
      return <div className="w-4 h-4 bg-[#8942C1] rounded-full" />;
    }
  };

  color();

  return <div className="mr-4">{color()}</div>;
}

export default CekPriority;
