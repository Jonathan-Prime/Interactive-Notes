
import React, { useState } from 'react'
import { useAppSelector } from '../../network/hooks'
import { characterLimit } from '@/utils/general'
import TransferWarningModal from './TransferWarningModal'
import Modal from './Modal'

interface props {
    setShowTransferTaskModal: React.Dispatch<React.SetStateAction<boolean>>
    currentTask: any,
}

const TransferTaskModal = ({ setShowTransferTaskModal, currentTask }: props) => {
    const { board } = useAppSelector((state) => state.board)
    const { user } = useAppSelector((state) => state.user)
    const [showWarning, setShowWarning] = useState<boolean>(false)
    const [currentBoard, setCurrentBoard] = useState('')

    const boardNameTag = user?.boards?.map((val: any, i: any) => (
        val._id !== board._id &&
        <div
            key={i}
            className={`py-3 text-mediumGrey flex items-center rounded-r-3xl mr-6 text-base font-bold gap-3 pl-6 -ml-1 cursor-pointer hover:bg-lightGrey ease transition duration-500 
                }`}
            onClick={() => { setShowWarning(true); setCurrentBoard(val) }}
        >
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill="currentColor"
                />
            </svg>
            to: {characterLimit(val?.title, 30)}
        </div>
    ));



    return (
        <div>
            <h1 className="text-lg font-bold mb-6"> Transfer Task</h1>

            <div>
                {boardNameTag}
                <Modal showModal={showWarning} setShowModal={setShowWarning}>
                    <TransferWarningModal currentBoard={currentBoard} currentTask={currentTask} setShowWarning={setShowWarning} setShowTransferModal={setShowTransferTaskModal} />
                </Modal>

            </div>
        </div>
    )
}

export default TransferTaskModal;



