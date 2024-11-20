import { useAppDispatch, useAppSelector } from '@/network/hooks'
import React, { useRef, useState } from 'react'
import Modal from '../Modal'
import Ratings from './Ratings'
import ChangePassword from './ChangePassword'
import UserProfileModal from './UserProfileModal'
import Image from 'next/image'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import PairSystem from './Pair/PairSystem'
import { useRouter } from 'next/router'
import { Power } from 'phosphor-react'
import { resetUser } from '@/features/private/user/userSlice'
import { resetBoard } from '@/features/private/boards/boardSlice'

const UserActions = () => {
    const { user } = useAppSelector(state => state.user)
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isUser, setIsUser] = useState<boolean>(false)
    const [isRating, setIsRating] = useState<boolean>(false)
    const [isChangePasswordModal, setIsChangePasswordModal] = useState<boolean>(false)
    const modalRef = useRef(null);
    const handleClickOutside = () => { setShowModal(!showModal) }
    useOnClickOutside(modalRef, handleClickOutside)

    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('countdown_start');
        window.location.href = '/auth/login';
        setTimeout(() => {
            dispatch(resetUser());
            dispatch(resetBoard());
        }, 3000);
    }



    return (
        <>
            <div className='relative dark:bg-darkGrey dark:text-white'>
                <div onClick={() => setShowModal(!showModal)} className='flex items-center cursor-pointer'>
                    <div className='name-tag uppercase bg-mainPurple text-white'>
                        {user?.username?.substring(0, 2)}
                    </div>
                    {user?.pairmode?.isActive &&
                        <div className='name-tag-two bg-white dark:bg-veryDarkGrey dark:text-white text-mainPurple uppercase border-2 dark:border-veryDarkGrey border-bg-lightGrey '>
                            {user?.pairmode?.initials?.substring(0, 2)}
                        </div>
                    }
                    &nbsp;
                    <Image alt='chevron-down' src={'/assets/icon-chevron-down.svg'} width="0" height="0" className="w-[13px] h-auto" />

                </div>
                {showModal &&
                    <div ref={modalRef} className='rounded-[6px]  border z-10 border-lightGreyLine dark:border-darkGreyLine shadow-sm absolute right-0 top-14 bg-white dark:bg-darkGrey dark:text-whitedark:bg-darkGrey dark:text-white w-[300px]'>
                        <ul>
                            <PairSystem setShowModal={setShowModal} />
                            <li onClick={() => { router.push('/user/dashboard'); setShowModal(false) }} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Dashboard</li>
                            <li onClick={() => setIsUser(!isUser)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Profile</li>
                            {user?.email !== "demo@email.com" ? <li onClick={() => setIsChangePasswordModal(!isChangePasswordModal)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Change Password</li> : <button className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer w-full text-left cursor-not-allowed'>Change Password</button>}
                            <li onClick={() => setIsRating(!isRating)} className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>Rate App</li>
                            <div onClick={logout} className='cursor-pointer rounded flex py-2 space-x-6 dark:text-white justify-center items-center bg-lightGrey dark:bg-veryDarkGrey mt-8'>
                                <button className='flex items-left space-x-3'>
                                    <Power size={22} color="#e50a24" weight="regular" />&nbsp;&nbsp;&nbsp;
                                    <span className=''>Logout</span>
                                </button>
                            </div>
                        </ul>
                    </div>
                }
            </div>

            <Modal setShowModal={setIsUser} showModal={isUser}>
                <UserProfileModal />
            </Modal>
            <Modal setShowModal={setIsRating} showModal={isRating}>
                <Ratings setIsRating={setIsRating} />
            </Modal>
            <Modal setShowModal={setIsChangePasswordModal} showModal={isChangePasswordModal}>
                <ChangePassword setIsChangePasswordModal={setIsChangePasswordModal} />
            </Modal>
        </>
    )
}

export default UserActions