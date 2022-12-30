import { IoIosAdd } from "react-icons/io";
import { Modal } from "../Modal";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";

function AddButton({ addData, loadingData, listData, setOpen, datacy }) {
  return (
    <>
      {listData ? (
        <button
          data-cy={datacy}
          onClick={() => setOpen(true)}
          className="w-28 cursor-pointer flex items-center justify-center bg-[#16ABF8] p-2 rounded-full "
        >
          <div className="flex items-center">
            <IoIosAdd className="w-6 cursor-pointer h-6 mr-1 text-white" />
            <label className="text-white cursor-pointer text-md">Tambah</label>
          </div>
        </button>
      ) : (
        <div
          onClick={addData}
          className="w-28 cursor-pointer flex items-center justify-center bg-[#16ABF8] p-2 rounded-full "
        >
          {loadingData ? (
            <TailSpin
              height="24"
              width="24"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <div className="flex items-center">
              <IoIosAdd className="w-6 cursor-pointer h-6 mr-1 text-white" />
              <label className="text-white cursor-pointer text-md">
                Tambah
              </label>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AddButton;
