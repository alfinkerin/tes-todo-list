import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import filter1 from "../../../assets/images/terbaru.png";
import filter2 from "../../../assets/images/terlama.png";
import filter3 from "../../../assets/images/az.png";
import filter4 from "../../../assets/images/za.png";
import filter5 from "../../../assets/images/belumselesai.png";
import { useState } from "react";

function Filter({ datacy }) {
  const [open, setOpen] = useState(false);

  //   console.log(list);

  //   const terbaru = () => {
  //     for (let li of list) {
  //       const arry = [li.id];
  //       const filter = arry.short(function (a, b) {
  //         return a - b;
  //       });
  //       console.log(filter);
  //     }
  //   };

  //   terbaru();

  //   const filteredDates = list.id.short();
  //   console.log(filteredDates);
  return (
    <div
      data-cy={datacy}
      className="w-10 h-10 relative mr-4 cursor-pointer flex items-center justify-center rounded-full border border-gray-500"
    >
      <div onClick={() => setOpen(!open)} className="flex">
        <BsArrowUp className="w-3 h-3" />
        <BsArrowDown className="w-3 h-3" />
      </div>

      {open ? (
        <div className="h-auto w-52 border absolute top-12 bg-white rounded-md flex items-center shadow-md">
          <ul className="w-full">
            <li className="h-12 w-full border-gray-100 border-b hover:bg-gray-200  flex items-center px-3">
              <img src={filter1} className="w-4 h-4 mr-2" alt="filter" />{" "}
              Terbaru
            </li>
            <li className="h-12 w-full border-gray-100 hover:bg-gray-200  border-b flex items-center px-3">
              <img src={filter2} className="w-4 h-4 mr-2" alt="filter" />{" "}
              Terlama
            </li>
            <li className="h-12 w-full border-gray-100 hover:bg-gray-200  border-b flex items-center px-3">
              <img src={filter3} className="w-4 h-4 mr-2" alt="filter" /> A-Z
            </li>

            <li className="h-12 w-full border-gray-100 hover:bg-gray-200  border-b flex items-center px-3">
              <img src={filter4} className="w-4 h-4 mr-2" alt="filter" /> Z-A
            </li>
            <li className="h-12 w-full border-gray-100 hover:bg-gray-200  border-b flex items-center px-3">
              <img src={filter5} className="w-4 h-4 mr-2" alt="filter" /> Belum
              Selesai
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Filter;
