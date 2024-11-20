import { useState } from "react"
import Modal from "../Modal"
import AddNewTaskModal from "../Modal/AddNewTaskModal"
import Button from "../shared/Button"

const EmptyBoard = () => {
  const [isModal, setIsModal] = useState<boolean>(false)
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-lightGrey dark:bg-veryDarkGrey">
      <h2 className="heading-lg text-mediumGrey text-center">This board is empty. Create a new tasks to get started.</h2> <br />
      <Button text={"+ Add New Task"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} onClick={() => setIsModal(true)} />

      <Modal showModal={isModal} setShowModal={setIsModal}>
        <AddNewTaskModal setShowModal={setIsModal}/>
      </Modal>
    </div>
  )
}
export default EmptyBoard
