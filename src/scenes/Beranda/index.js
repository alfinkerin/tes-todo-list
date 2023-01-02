import { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import axios from "axios";
import emptyState from "../../assets/images/emptystate.png";
import AddButton from "../../components/Elements/AddButton";
import Card from "../../components/Elements/Card";
import { RiAlertLine } from "react-icons/ri";
import { DeleteModal } from "./component/DeleteModal";
import { Alert } from "./component/Alert";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Beranda() {
  const [listData, setListData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [titleDelete, setTitleDelete] = useState("");
  const [idActivity, setIdActivity] = useState("");

  const addData = () => {
    setLoadingData(true);
    axios
      .post(
        `https://todo.api.devcode.gethired.id/activity-groups`,
        {
          email: "testing@gmail.com",
          title: "New Activity",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        console.log(res);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://todo.api.devcode.gethired.id/activity-groups?email=testing@gmail.com`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setListData(res.data.data);
        setTotalData(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [totalData, loadingData, isDelete]);

  const removeData = () => {
    setIsDelete(true);
    axios
      .delete(
        `https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setIsDelete(false);
        setOpenModal(false);
        setOpenAlert(true);
      })
      .catch((err) => {
        console.log(err);
        setIsDelete(false);
        setOpenModal(false);
      });
  };

  return (
    <>
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
      <Alert openAlert={openAlert} close={() => setOpenAlert(false)}>
        <div className="flex items-center">
          <AiOutlineInfoCircle
            data-cy="modal-information-icon"
            className="w-5 h-5 mr-3 text-green-600"
          />{" "}
          <label data-cy="modal-information-title">
            Activity berhasil di hapus
          </label>
        </div>
      </Alert>
      <Layout>
        <div className="mb-20 mt-10 md:mt-0 md:mb-10 flex items-center justify-between">
          <span data-cy="activity-title" className="text-3xl font-bold">
            Activity
          </span>
          <AddButton
            datacy="activity-add-button"
            loadingData={loadingData}
            addData={addData}
          />
        </div>
        {totalData === 0 ? (
          <div
            data-cy="activity-empty-state"
            className="w-full h-full object-cover flex items-center justify-center"
          >
            <img
              className="w-[80%] h-[70%] md:w-[55%] md:h-[55%]"
              src={emptyState}
              alt="empty-state"
            />
          </div>
        ) : (
          <div className="w-full flex flex-wrap ">
            {listData.map((x, i) => (
              <div
                data-cy={`activity-item-${i}`}
                key={i}
                className="m-2 w-[45%] h-40 md:w-[22%] md:h-52"
              >
                <Card
                  setTitleDelete={setTitleDelete}
                  setOpenModal={setOpenModal}
                  setIdActivity={setIdActivity}
                  id={x.id}
                  created={x.created_at}
                  title={x.title}
                />
              </div>
            ))}
          </div>
        )}
      </Layout>
    </>
  );
}

export default Beranda;
