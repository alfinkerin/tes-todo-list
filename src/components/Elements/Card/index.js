import { DateTime } from "luxon";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";

function Card({
  title,
  created,
  id,
  setOpenModal,
  setTitleDelete,
  setIdActivity,
}) {
  const date = DateTime.fromISO(created)
    .setLocale("ind")
    .toLocaleString(DateTime.DATE_FULL);

  return (
    <>
      <Link to={`/detail/${id}`} state={{ title: title, id: id }}>
        <div className="w-full h-full flex flex-col  justify-between border bg-white border-none shadow-xl rounded-t-xl py-6 px-7">
          <span className=" text-lg text-black font-bold text-ellipsis break-words">
            {title}
          </span>
        </div>
      </Link>
      <div className="flex justify-between items-center bg-white  shadow-xl rounded-b-xl py-4 px-7">
        <span className="text-[#888888] text-sm">{date}</span>
        <RiDeleteBin6Line
          onClick={() => {
            setTitleDelete(title);
            setOpenModal(true);
            setIdActivity(id);
          }}
          className="w-4 h-4 cursor-pointer text-[#888888]"
        />
      </div>
    </>
  );
}

export default Card;
