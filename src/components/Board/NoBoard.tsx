import Button from "../shared/Button"
import { useState } from 'react'
import Modal from "../Modal"
import CreateNewBoard from "../Modal/CreateNewBoard"
import { useAppSelector } from "@/network/hooks"

const NoBoard = () => {
    const [isCreateBoardModal, setIsCreateBoardModal] = useState<boolean>(false)
    const { user } = useAppSelector((state) => state.user);
 

    return (
        <>
            {user?.username &&
                <>
                    <div className="flex flex-col justify-center items-center w-full h-full bg-lightGrey dark:bg-veryDarkGrey">
                        {!user?.pairmode.isActive && <h2 className="heading-lg text-mediumGrey text-center">Hi {user?.username}, you have no boards created yet.</h2>}
                        {user?.pairmode.isActive && <h2 className="heading-lg text-mediumGrey text-center">Hi {user?.username}, you have no boards shared with {user?.pairmode.initials} yet.</h2>} <br />
                        <Button onClick={() => setIsCreateBoardModal(!isCreateBoardModal)} text={"+ Create New Board"} padding={'py-3 px-4'} width={''} color={'text-white'} font_weight={'font-bold'} />
                    </div>
                    <Modal showModal={isCreateBoardModal} setShowModal={setIsCreateBoardModal} >
                        <CreateNewBoard showModal={isCreateBoardModal} setShowModal={setIsCreateBoardModal} />
                    </Modal>
                </>
            }
        </>
    )
}
export default NoBoard
