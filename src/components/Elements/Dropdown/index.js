import { IoIosArrowDown } from "react-icons/io";

function Dropdown({ isDropDown, setIsDropDown, select, setSelect }) {
  const options = [
    {
      title: "Very High",
      dot: "w-3 h-3 rounded-full bg-[#ED4C5C] my-3 mr-3 cursor-pointer",
      value: "very-high",
    },
    {
      title: "High",
      dot: "w-3 h-3 rounded-full bg-[#F8A541] my-3 mr-3 cursor-pointer",
      value: "high",
    },
    {
      title: "Medium",
      dot: "w-3 h-3 rounded-full bg-[#00A790] my-3 mr-3 cursor-pointer",
      value: "normal",
    },
    {
      title: "Low",
      dot: "w-3 h-3 rounded-full bg-[#428BC1] my-3 mr-3 cursor-pointer",
      value: "low",
    },
    {
      title: "Very Low",
      dot: "w-3 h-3 rounded-full bg-[#8942C1] my-3 mr-3 cursor-pointer",
      value: "very-low",
    },
  ];
  return (
    <>
      <div className="relative mt-2">
        <div
          onClick={() => setIsDropDown(!isDropDown)}
          className="w-64 h-10 shadow-xl cursor-pointer flex items-center justify-between py-2 px-4 rounded-md bg-white border "
        >
          <div className="flex items-center">
            <div className={select.dot} />
            <span>{select.title}</span>
          </div>

          <IoIosArrowDown className="w-4 h-4" />
        </div>
        {isDropDown && (
          <div className="absolute w-64 top-10 bg-white shadow-xl rounded-xl border p-2">
            {options.map((x, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelect({
                    title: x.title,
                    dot: x.dot,
                    value: x.value,
                  });
                  setIsDropDown(false);
                }}
                className="w-full flex cursor-pointer items-center "
              >
                <span className={x.dot} />
                <span> {x.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dropdown;
