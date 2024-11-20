import { deleteBoard, deleteTask, getBoard, resetBoard } from '@/features/private/boards/boardSlice'
import { getUser } from '@/features/private/user/userSlice'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { useEffect } from 'react'
// import { Task } from '@src/types'


interface deleteWarningProps {
    currentTask: any
    type: string
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleteBoardModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteWarningModal = ({ type, setShowDetails, currentTask, setShowMenu, setShowDeleteBoardModal }: deleteWarningProps) => {
    const { board } = useAppSelector((state) => state.board);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAppSelector(state => state?.user)
    const query = router.query.id;



    const deleteBoardAction = () => {
        dispatch(deleteBoard({ id: board?._id, router: router, user: user }))
        dispatch(getUser())
        setShowDeleteBoardModal(false)
    }

    const deleteTaskAction = () => {
        dispatch(deleteTask({ boardId: board?._id, noteId: currentTask?._id }))
        dispatch(resetBoard())
        dispatch(getBoard({id:query}))
        setShowDetails(false)
    }

    return (
        <div className="space-y-6 w-full mx-auto rounded-md bg-white dark:bg-darkGrey">
            <h1 className="text-mainRed font-bold text-[16px]">Delete this {type === "Board" ? 'board' : 'task'}?</h1>
            {type === 'Board' ?
                <p className="text-[13px] text-black dark:text-white">Are you sure you want to delete the &apos;{board?.title}&apos; board? This action will remove all columns and tasks and cannot be reversed.</p> :
                <p className="text-[13px] text-black dark:text-white">Are you sure you want to delete the  &apos;{currentTask?.title}&apos; task and its subtasks? This action cannot be reversed</p>
            }
            <div className="flex gap-4">

                <button className="flex-1 bg-mainRed text-white text-[13px] rounded-full p-2 transition duration-200 hover:bg-mainRedHover"
                    onClick={type === "Board" ? deleteBoardAction : deleteTaskAction}
                >
                    Delete
                </button>
                <button onClick={() => { setShowDeleteBoardModal(false); setShowMenu(false) }} className="flex-1 bg-mainPurple bg-opacity-10 text-mainPurple text-[13px] rounded-full p-2 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white"  >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default DeleteWarningModal;
