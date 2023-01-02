import AddButton from "../../components/Elements/AddButton";
import Layout from "../../components/Layouts";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import Filter from "../../components/Elements/Filter";
import { Modal } from "../../components/Elements/Modal";
import todo from "../../assets/images/todo.png";
import Dropdown from "../../components/Elements/Dropdown";
import CekPriority from "../../components/Elements/CekPriority";
import clsx from "clsx";
import { RiDeleteBinLine, RiAlertLine } from "react-icons/ri";
import { DeleteModal } from "./component/DeleteModal";
import { EditModal } from "./component/EditModal";

function Detail() {
  const location = useLocation();
  const { title, id } = location.state;

  const [isForm, setIsForm] = useState(true);
  const [name, setName] = useState(title);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [list, setList] = useState([]);
  const [totalList, setTotalList] = useState(0);
  const [isDropDown, setIsDropDown] = useState(false);
  const [titleForm, setTitleForm] = useState("");
  const [select, setSelect] = useState({
    title: "Very High",
    dot: "w-3 h-3 rounded-full bg-[#ED4C5C] my-3 mr-3 cursor-pointer",
    value: "very-high",
  });
  const [checked, setChecked] = useState(false);
  const [titleDelete, setTitleDelete] = useState("");
  const [idModal, setIdModal] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPriority, setEditPriority] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setList(res.data.data);
        setTotalList(res.data.total);
      })
      .catch((err) => {});
  }, [isSubmit, checked, isDeleteLoading]);

  const handleNameEdit = (event) => {
    setEditName(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleTitle = (event) => {
    setTitleForm(event.target.value);
  };

  const blurHandler = () => {
    if (name !== title) {
      axios
        .patch(
          `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
          {
            title: name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        .then((res) => {
          setIsForm(true);
        })
        .catch((err) => {
          setIsForm(true);
        });
    } else {
      console.log("silahkan di isi");
    }
  };

  const handleList = async (e) => {
    setIsSubmit(true);
    e.preventDefault();

    await axios
      .post(
        `https://todo.api.devcode.gethired.id/todo-items`,
        {
          activity_group_id: id,
          title: titleForm,
          priority: select.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setIsSubmit(false);
        setOpen(false);
        setTitleForm("");
      })
      .catch((err) => {
        setIsSubmit(false);
        setOpen(false);
        setTitleForm("");
      });
  };

  const handleChecked = (id, is_active) => {
    setChecked(true);

    axios
      .patch(
        `https://todo.api.devcode.gethired.id/todo-items/${id}`,
        {
          is_active,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setChecked(false);
      })
      .catch((err) => {
        setChecked(false);
      });
  };

  const removeData = () => {
    setIsDeleteLoading(true);
    axios
      .delete(`https://todo.api.devcode.gethired.id/todo-items/${idModal}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        setOpenModal(false);
        setIsDeleteLoading(false);
      })
      .catch((err) => {
        setOpenModal(false);
        setIsDeleteLoading(false);
      });
  };

  const handleEdit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();

    await axios
      .patch(
        `https://todo.api.devcode.gethired.id/todo-items/${idModal}`,
        {
          activity_group_id: id,
          title: editName,
          priority: select.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setIsSubmit(false);
        setOpenModalEdit(false);
      })
      .catch((err) => {
        setIsSubmit(false);
        setOpenModalEdit(false);
      });
  };

  return (
    <div>
      <Modal
        datacy="modal-add"
        title="Tambah List Item"
        withCloseButton
        open={open}
        close={() => setOpen(false)}
      >
        <form onSubmit={handleList}>
          <div className="py-6 ">
            <label>Name List Item</label>
            <input
              className="w-full h-10 my-2 border rounded-md p-2 focus:outline-none focus:ring-2  focus:border-transparent"
              id="target"
              type="text"
              data-cy="moda-add-name-input"
              placeholder="Tambahkan Nama Activity"
              value={titleForm}
              onChange={handleTitle}
            />

            <label>Priority</label>
            <Dropdown
              data-cy="modal-add-priority-dropdown"
              isDropDown={isDropDown}
              setIsDropDown={setIsDropDown}
              select={select}
              setSelect={setSelect}
            />
            <div className="w-full flex justify-end">
              <input
                data-cy="modal-add-save-button"
                type="submit"
                className="w-32 h-10 text-white mt-6 cursor-pointer bg-[#16ABF8] rounded-full"
              />
            </div>
          </div>
        </form>
      </Modal>
      <DeleteModal
        datacy="modal-delete"
        openModal={openModal}
        close={() => setOpenModal(false)}
      >
        <div className="my-4 flex flex-col items-center justify-center w-full">
          <RiAlertLine
            data-cy="modal-delete-icon"
            className="w-16 h-16 text-red-500"
          />
          <p className="mt-4 text-lg mb-2">Apakah anda yakin menghapus item</p>
          <p data-cy="modal-delete-title" className="text-xl font-bold">
            "{titleDelete}"?
          </p>
        </div>
        <div className="flex mt-12 justify-center items-center">
          <button
            data-cy="modal-delete-cancel-button"
            onClick={() => setOpenModal(false)}
            className="w-24 h-10 bg-gray-100 font-medium p-2 mr-12 rounded-full"
          >
            Batal
          </button>
          <button
            data-cy="modal-delete-confirm-button"
            onClick={removeData}
            className="w-24 h-10 bg-red-400 font-medium text-white p-2 ml-12 rounded-full"
          >
            Hapus
          </button>
        </div>
      </DeleteModal>
      <EditModal
        title="Edit Item"
        withCloseButton
        openModalEdit={openModalEdit}
        close={() => setOpenModalEdit(false)}
      >
        <form onSubmit={handleEdit}>
          <div className="py-6 ">
            <label>Name List Item</label>
            <input
              className="w-full h-10 my-2 border rounded-md p-2 focus:outline-none focus:ring-2  focus:border-transparent"
              id="target"
              type="text"
              placeholder="Tambahkan Nama Activity"
              value={editName}
              onChange={handleNameEdit}
            />

            <label>Priority</label>
            <Dropdown
              isDropDown={isDropDown}
              setIsDropDown={setIsDropDown}
              select={select}
              setSelect={setSelect}
            />
            <div className="w-full flex justify-end">
              <input
                type="submit"
                className="w-32 h-10 text-white mt-6 cursor-pointer bg-[#16ABF8] rounded-full"
              />
            </div>
          </div>
        </form>
      </EditModal>
      <Layout>
        <div
          data-cy="Item List- Empty State"
          className="mb-20 mt-10 md:mt-0 md:mb-10 block md:flex items-center justify-between"
        >
          <div className="flex w-full md:w-[35%] justify-between items-center break-words">
            <div className="flex w-auto items-center ">
              <Link to="/">
                <IoIosArrowBack
                  data-cy="todo-back-button"
                  className="h-6 w-6 text-black mr-4 font-bold cursor-pointer"
                />
              </Link>
              {isForm ? (
                <span
                  data-cy="todo-title"
                  className="text-xs w-full break-words md:text-3xl font-bold "
                >
                  {name}
                </span>
              ) : (
                <input
                  className="w-full md:w-64 h-10 my-2 shadow-none bg-[#eff3f6] border-b-2 border-black outline-none"
                  id="target"
                  type="text"
                  value={name}
                  onChange={handleName}
                  onBlur={blurHandler}
                />
              )}
            </div>

            <MdOutlineModeEditOutline
              data-cy="todo-title-edit-button"
              onClick={() => setIsForm(!isForm)}
              className="text-[#A4A4A4]  h-6 w-6 mt-1 cursor-pointer ml-4"
            />
          </div>
          <div className="flex items-center justify-end my-6 ">
            <Filter datacy="todo-sort-button" list={list} />
            <AddButton datacy="todo-add-button" listData setOpen={setOpen} />
          </div>
        </div>

        {totalList === 0 ? (
          <div
            data-cy="todo-empty-state"
            className="w-full h-full object-cover flex items-center justify-center "
          >
            <img
              onClick={() => setOpen(true)}
              className="w-[48%] h-[48%] cursor-pointer"
              src={todo}
              alt="empty-state"
            />
          </div>
        ) : (
          <div className="">
            {list.map((x, i) => (
              <div
                data-cy={`todo-item-${i}`}
                key={i}
                className="w-full h-20 shadow-lg my-4 bg-white rounded-md flex justify-between items-center px-6"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={x.is_active === 0}
                    onChange={() =>
                      handleChecked(x.id, x.is_active === 0 ? 1 : 0)
                    }
                    className="w-5 h-5 mr-6 cursor-pointer "
                  />
                  <div className="flex items-center">
                    <CekPriority cekPriority={x.priority} />
                    <label
                      className={clsx(
                        "text-gray-600 text-sm md:text-xl",
                        x.is_active === 0 ? "line-through " : null
                      )}
                    >
                      {x.title}
                    </label>
                    <MdOutlineModeEditOutline
                      onClick={() => {
                        setEditName(x.title);
                        setOpenModalEdit(true);
                        setIdModal(x.id);
                      }}
                      className="text-[#A4A4A4] w-4 h-4  md:h-5 md:w-5 mt-1 cursor-pointer ml-3"
                    />
                  </div>
                </div>

                <RiDeleteBinLine
                  className="w-5 h-5 text-[#888888] cursor-pointer"
                  onClick={() => {
                    setTitleDelete(x.title);
                    setEditPriority(x.priority);
                    setOpenModal(true);
                    setIdModal(x.id);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Layout>
    </div>
  );
}

export default Detail;
