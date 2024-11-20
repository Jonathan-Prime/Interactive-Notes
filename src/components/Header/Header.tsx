import React, { useState } from 'react'
import Image from 'next/image'
import Button from '../shared/Button'
import EditButton from '../shared/EditButton'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import Modal from '../Modal'
import AddNewTaskModal from '../Modal/AddNewTaskModal'
import UserActions from '../User/UserActions'
import { useRouter } from 'next/router'
import useWindowSize from '@/hooks/useWindowSize'
import { characterLimit } from '@/utils/general'
import { AnimatePresence } from 'framer-motion'
import MobileMenu from '../Modal/MobileMenu'
import CountdownTimer from '../shared/CountdownTimer'
import { ArrowClockwise } from 'phosphor-react'
import { getUser } from '@/features/private/user/userSlice'
import { getBoard } from '@/features/private/boards/boardSlice'
import FullscreenComponent from '../FullScreen'





const Header = () => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { user } = useAppSelector(state => state.user)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)



  const boardTitle: any = () => {
    const query = router?.query.id;
    const board = user?.boards?.find((board: any) => board?._id === query);

    if (user?.boards.length !== 0 && !board) {
      return width < 480 ? (characterLimit('Select board', 9)) : 'Select board'
    }
    if (!board) {
      return width < 480 ? (characterLimit('No Board Found', 9)) : 'No Board Found'
    }

    return width < 480 ? (characterLimit(board?.title, 9)) : board?.title
  };

  const refreshPage = () => {
    dispatch(getUser())
    const query = router?.query.id;
    const board = user?.boards?.find((board: any) => board?._id === query);

    if (board) {
      dispatch(getBoard({ id: router.query.id }));
    }

    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 2000)
  }


  return (
    <>
      <header className='flex items-center justify-between sm:h-[85px] absolute top-0 left-0 w-full h-[70px] bg-white dark:bg-darkGrey dark:text-white dark:border-darkGreyLine border-b-2'>
        <CountdownTimer />
        <AnimatePresence>
          {width > 768 ? (
            <div className="flex items-center">
              <div className="w-[300px] p-8 box-border transition-all ease border-r border-r-lightGreyLine dark:border-r-darkGreyLine">
                <div onClick={() => router.push('/user/dashboard')} className='text-[30px] font-bold cursor-pointer' style={{ background: 'linear-gradient(to right, #02002e, #b6b4df 50%, #FFFFFF 50%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Interactive Note</div>
              </div>
            </div>
          ) : (
            <>
              <div className='flex pl-[16px] w-full' >
                <Image src="/assets/logo-mobile.svg" onClick={() => router.push('/user/dashboard')} alt="kanban logo" height={25} width={24} />
                <button onClick={() => setShowMenu(!showMenu)} className="flex justify-center items-center">
                  <h2 className="ml-3 mr-2 font-semibold text-[16px] text-#20212C whitespace-nowrap">{boardTitle()}</h2>
                  {showMenu ? (
                    <Image alt='chevron-up' src={'/assets/icon-chevron-up.svg'} width="0" height="0" className="w-[13px] h-auto" />
                  ) : (
                    <Image alt='chevron-down' src={'/assets/icon-chevron-down.svg'} width="0" height="0" className="w-[13px] h-auto" />
                  )}
                </button>
              </div>
              <Modal general={'mob-adjust'} showModal={showMenu} setShowModal={setShowMenu}>
                <MobileMenu setShowMenu={setShowMenu} />
              </Modal>
            </>
          )}
        </AnimatePresence>

        <div className='flex items-center justify-between w-[100%] sm:px-6 px-3'>
          {width > 768 ? <h1 className='font-semibold text-[18px] text-#20212C'>{boardTitle()}</h1> : <span>&nbsp;</span>}

          <div className='flex items-center space-x-4'>
            <ArrowClockwise className={`${isClicked && 'refresh-app'} cursor-pointer`} onClick={refreshPage} size={32} color="#635FC7" weight="fill" />
            {width > 767  && <FullscreenComponent /> }
            {user?.boards?.length! > 0 && router?.query.id && (
              width > 768 ? (
                <Button
                  text={"+ Add New Task"}
                  padding={'py-3 px-4'}
                  width={''}
                  color={'text-white'}
                  font_weight={'font-bold'}
                  onClick={() => setIsAddNewTask(!isAddNewTask)}
                />
              ) : (
                <button className="bg-mainPurple rounded-2xl py-3 px-4 flex justify-center items-center" onClick={() => setIsAddNewTask(!isAddNewTask)}>
                  <Image src="/assets/icon-add-task-mobile.svg" alt="plus icon" height={12} width={12} />
                </button>
              )
            )}
            {user?.boards?.length! > 0 && router?.query.id && (
              <EditButton
                className={'-bottom-28 -left-44 '}
                type="Board"
                task={undefined}
                setShowDetails={function (value: React.SetStateAction<boolean>): void {
                  throw new Error('Function not implemented.')
                }}
              />
            )}
            <UserActions />
          </div>


        </div>

        <Modal showModal={isAddNewTask} setShowModal={setIsAddNewTask}>
          <AddNewTaskModal setShowModal={setIsAddNewTask} />
        </Modal>
      </header>
    </>
  )
}

export default Header;