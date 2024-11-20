
import React, { useState } from 'react'
import PairRequestForm from './PairRequestForm'
import Modal from '@/components/Modal/Modal'
import { useAppSelector } from '@/network/hooks'
import { useRouter } from 'next/router'
import TogglePairMode from './TogglePairMode'
import UnpairUser from './UnpairUser'


interface IProps {
  setShowModal: any
}

const PairSystem = ({ setShowModal }: IProps) => {
  const [isModal, setIsModal] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.user)
  const router = useRouter();


  return (
    <>
      {!user?.pairmode.enabled && (
        <>
          <div
            className='py-2 px-3 text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey cursor-pointer'
            onClick={() => setIsModal(!isModal)}
          >
            Request Pair Mode
          </div>
          <Modal setShowModal={setIsModal} showModal={isModal}>
            <PairRequestForm />
          </Modal>
        </>
      )}
      {user?.pairmode.enabled && (
        <>
          {!router.pathname.includes('pair') && (
            <>
              <div
                className='flex items-center justify-between space-x-3 py-2 px-3  dark:border-darkGreyLine text-[14px] hover:bg-lightGreyLine dark:hover:bg-veryDarkGrey w-full text-left'
              >
                <div className='flex items-center space-x-3'>
                  <span>{user?.pairmode?.isActive ? 'Switch to Personal' : 'Switch to Pair Mode'}</span>
                  <span className='flex'>
                    <div
                      className='uppercase text-[12px] border-2 border-bg-lightGrey dark:text-white text-mainPurple px-1 py-2 rounded-full round-set'
                    >
                      {user?.username?.substring(0, 2)}
                    </div>
                    {!user?.pairmode?.isActive &&
                      <div
                        className='uppercase text-[12px] -ml-1 border-2 border-bg-lightGrey dark:text-white text-mainPurple px-1 py-2 rounded-full round-set'
                      >
                        {user?.pairmode?.initials?.substring(0, 2)}
                      </div>
                    }
                  </span>
                </div>
                <TogglePairMode setShowModal={setShowModal} />
              </div>
              <UnpairUser />
            </>
          )}
        </>
      )}
    </>
  );

}

export default PairSystem