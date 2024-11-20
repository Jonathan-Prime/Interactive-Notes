import { resetBoard } from '@/features/private/boards/boardSlice';
import { resetUser } from '@/features/private/user/userSlice';
import { useAppDispatch } from '@/network/hooks';
import { Power } from 'phosphor-react';
import React from 'react'
import useWindowSize from '../../hooks/useWindowSize';
import BoardNamesTag from './BoardNamesTag'
import SideBardToggle from './HideSideBar'
import ToggleThemeSwitch from './ToggleThemeSwitch'

interface props {
    isSidebar: boolean,
    setIsSidebar: (val: boolean) => void;
}

const SideBar = ({ isSidebar, setIsSidebar }: props): JSX.Element => {
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();


    return (
        <>
            {
                width > 766 &&
                <section
                    className={`sidebar z-0 transition-all border-gray-50 border-r bg-white dark:bg-darkGrey dark:text-white dark:border-r-darkGreyLine border-r-lightGreyLine ease 
                        ${isSidebar ? "open "
                            :
                            ""}`
                    }
                >
                    <div className='sidebar-content flex flex-col justify-between h-[calc(90vh-120px)]'>
                        <BoardNamesTag />
                        <div>
                            <ToggleThemeSwitch />
                            <SideBardToggle setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default SideBar;
