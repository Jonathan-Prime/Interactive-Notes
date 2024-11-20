import Modal from '@/components/Modal/Modal'
import { unPairUser } from '@/features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/network/hooks'
import { characterLimit } from '@/utils/general'
import { useRouter } from 'next/router'
import { LinkBreak } from 'phosphor-react'
import React, { useState } from 'react'

const UnpairUser = () => {
    const [isModal, setIsModal] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isSuccess } = useAppSelector(state => state.user)


    return (
        <div className='border-b border-lightGreyLine dark:border-darkGreyLine'>
            <article onClick={() => setIsModal(!isModal)} className='flex items-center justify-between py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'>
                <span>Unpair from {characterLimit(user?.pairmode?.initials, 14)}</span>
                <LinkBreak size={26} color="#635FC7" weight="fill" />
            </article>

            <Modal setShowModal={setIsModal} showModal={isModal}>
                <div className="space-y-6 w-full mx-auto rounded-md bg-white dark:bg-darkGrey">
                    <h1 className="text-mainRed font-bold text-[16px]">Unpair from {characterLimit(user?.pairmode?.initials, 20)}?</h1>
                    <p
                        className="text-[13px] text-black dark:text-white">Are you sure you want to unpair from&nbsp;
                        <span className='text-mainRed'>{characterLimit(user?.pairmode?.initials, 20)}</span>.
                        This action will remove all boards and tasks shared between your pair and cannot be reversed.
                    </p>
                    <div className="flex gap-4">
                        <button className="flex-1 bg-mainRed text-white text-[13px] rounded-full p-2 transition duration-200 hover:bg-mainRedHover"
                            onClick={() => dispatch(unPairUser({ router: router, move: isSuccess }))}
                        >
                            Unpair
                        </button>
                        <button onClick={() => { setIsModal(false) }} className="flex-1 bg-mainPurple bg-opacity-10 text-mainPurple text-[13px] rounded-full p-2 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white"  >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UnpairUser