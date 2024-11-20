import {  getBoard, transferTask } from '@/features/private/boards/boardSlice'
import { useAppDispatch } from '../../network/hooks'
import { useRouter } from 'next/router'


interface deleteWarningProps {
    currentTask: any,
    currentBoard: any,
    setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
    setShowTransferModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TransferWarningModal = ({ setShowTransferModal, currentTask, currentBoard, setShowWarning}: deleteWarningProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const query = router.query.id;


    const TransferTaskAction = () => {
        dispatch(transferTask({ noteId: currentTask?._id, boardId: currentBoard?._id }))
        setTimeout(() =>{
            dispatch(getBoard({id:query}))
        }, 2000)
        setShowTransferModal(false)
    }

    return (
        <div className="space-y-6 w-full mx-auto rounded-md bg-white dark:bg-darkGrey">
            <h1 className="text-mainPurple font-bold text-[16px]">Transfer this task?</h1>
            <p className="text-[13px] text-black dark:text-white !normal-case">Are you sure you want to transfer the &apos;{currentTask?.title}&apos; task and its subtasks to &apos;{currentBoard?.title}&apos; board? </p>
            <div className="flex gap-4">
                <button className="flex-1 bg-mainPurple text-white text-[13px] rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover"
                    onClick={TransferTaskAction}
                >
                    Transfer
                </button>
                <button onClick={() => { setShowTransferModal(false); setShowWarning(false) }} className="flex-1 bg-mainPurple bg-opacity-10 text-mainPurple text-[13px] rounded-full p-2 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white"  >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default TransferWarningModal;