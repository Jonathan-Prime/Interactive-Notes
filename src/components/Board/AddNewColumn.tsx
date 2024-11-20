import Modal from "../Modal";
import { useState } from "react";

const AddNewColumn = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
        <button className=" text-mediumGrey transition duration-400 hover:text-mainPurple mt-10 flex items-center justify-center min-w-[280px] rounded-md bg-gradient-to-b from-[#E9EFFA] dark:from-[#2b2c373f] to-[rgba(233, 239, 250, 0.5)] dark:to-[#2b2c371f]"
        onClick={() => setOpenModal(!openModal)}>
            + New Column
        </button>
        <Modal showModal={openModal} setShowModal={setOpenModal}>
           {/* <AddNewColumnModal setOpenModal={setOpenModal} /> */}
        </Modal>
    </>
  )
}
export default AddNewColumn;
