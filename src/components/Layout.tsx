import { useAppDispatch, useAppSelector } from '@/network/hooks'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ShowSidebar from './Board/ShowSideBar'
import Header from './Header'
import SideBar from './SideBar'
import InAppLoader from './Loaders/InAppLoader'
import LoadingScreen from './Loaders/LoadingScreen'
import Loader from './Loaders/Loader'

const Layout = ({ children }: any) => {
  const [isSidebar, setIsSidebar] = useState<boolean>(true)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, user, message } = useAppSelector((state) => state.user)
  const { isLoading: boardLoader } = useAppSelector((state) => state.board)


  // useEffect(() => {
  //   if (user?.boards?.length === 0) {
  //     router.replace('/user/dashboard')
  //   }
  // }, [dispatch, router, user?.boards?.length])
  function goHome() {
    router.push('/')
    localStorage.removeItem('authToken');
    localStorage.removeItem('countdown_start');
  }

  return user ? (
    <section className='w-full'>
      {boardLoader && <Loader />}
      <Header />
      <ShowSidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      <div className='flex h-[calc(100vh-85px)] sm:mt-[85px] mt-[70px] sido w-full'>
        <SideBar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        <div className={`maino w-full dark:bg-veryDarkGrey ${isSidebar ? "pushed" : ""}`}>
          {boardLoader ? <InAppLoader /> : children}
        </div>
      </div>
    </section>
  )
    : (
      isLoading ? <LoadingScreen />
        :
        <>
          <div className='flex items-center justify-center mt-14'>
            <div style={{ marginBottom: '100px', textAlign: 'center' }}>
              {message as string}
            </div>
            <div
              style={{ textAlign: 'center' }}
              onClick={goHome}>{'<='} Go Home</div>
          </div>
        </>
    );


}

export default Layout;