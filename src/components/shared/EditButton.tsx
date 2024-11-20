import React, { useState, useRef } from 'react'
import Image from 'next/image';
import Modal from '../Modal';
import DeleteWarningModal from '../Modal/DeleteWarningModal';
import UpdateBoardModal from '../Modal/UpdateBoardModal';
import UpdateTaskModal from '../Modal/UpdateTaskModal';
import useOnClickOutside from '../../hooks/useOnClickOutside'
import TransferTaskModal from '../Modal/TransferTaskModal';
// import { Task } from '@src/types';


interface editButtonProps {
  task: any
  className: string
  type: string
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const EditButton = ({ type, task, setShowDetails, className }: editButtonProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showUpdateBoardModal, setShowUpdateBoardModal] = useState<boolean>(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState<boolean>(false);
  const [showTransferTaskModal, setShowTransferTaskModal] = useState<boolean>(false);

  const menuRef = useRef(null)

  const handleClickOutside = () => { setShowMenu(!showMenu) }
  useOnClickOutside(menuRef, handleClickOutside)

  return (
    <div className='relative'>
      <button className="h-8 w-4 py-2 hover:bg-lightGrey hover:rounded-md flex items-center justify-center" onClick={() => setShowMenu(!showMenu)}>
        <Image src="/assets/icon-vertical-ellipsis.svg" alt="vertical ellipsis" height={16} width={4} />
      </button>
      {showMenu &&

        (type === "Board" ?
          <div ref={menuRef} className={`${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize bg-white dark:bg-veryDarkGrey`}
          >
            <>
              <button
                className="text-mediumGrey text-[13px]"
                onClick={() => setShowUpdateBoardModal(!showUpdateBoardModal)}
              >
                Edit board
              </button>
              <Modal showModal={showUpdateBoardModal} setShowModal={() => setShowUpdateBoardModal(!showUpdateBoardModal)}>
                <UpdateBoardModal setShowUpdateBoardModal={setShowUpdateBoardModal} />
              </Modal>
              <button
                className="text-mainRed  text-[13px]"
                onClick={() => setShowDeleteBoardModal(true)}
              >Delete board
              </button>
              <Modal showModal={showDeleteBoardModal} setShowModal={() => setShowDeleteBoardModal(!showDeleteBoardModal)}>
                <DeleteWarningModal setShowDetails={setShowDetails} currentTask={task} type='Board' setShowMenu={setShowMenu} setShowDeleteBoardModal={setShowDeleteBoardModal} />
              </Modal>
            </>
          </div>

          :

          // tasks CTA Modals
          <div ref={menuRef} className={`${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize bg-white dark:bg-veryDarkGrey`}
          >
            <>
              <button
                className="text-mediumGrey text-[13px]"
                onClick={() => setShowUpdateBoardModal(!showUpdateBoardModal)}
              >
                Edit Task
              </button>
              <Modal showModal={showUpdateBoardModal} setShowModal={() => setShowUpdateBoardModal(!showUpdateBoardModal)}>
                <UpdateTaskModal task={task} setShowUpdateBoardModal={setShowUpdateBoardModal} setShowMenu={setShowMenu} />
              </Modal>
              <button
                className="text-mediumGrey text-[13px]"
                onClick={() => setShowTransferTaskModal(!showTransferTaskModal)}
              >
                Transfer Task
              </button>
              <Modal showModal={showTransferTaskModal} setShowModal={setShowTransferTaskModal}>
                <TransferTaskModal currentTask={task} setShowTransferTaskModal={setShowTransferTaskModal} />
              </Modal>
              <button
                className="text-mainRed  text-[13px]"
                onClick={() => setShowDeleteBoardModal(true)}
              >Delete Task
              </button>
              <Modal showModal={showDeleteBoardModal} setShowModal={() => setShowDeleteBoardModal(!showDeleteBoardModal)}>
                <DeleteWarningModal currentTask={task} type='' setShowDetails={setShowDetails} setShowMenu={setShowMenu} setShowDeleteBoardModal={setShowDeleteBoardModal} />
              </Modal>
            </>
          </div>
        )
      }
    </div>
  )
}

export default EditButton;