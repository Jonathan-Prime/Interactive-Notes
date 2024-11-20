import React, { useEffect, } from 'react'
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getUser, togglePairMode } from '@/features/private/user/userSlice';
import { useRouter } from 'next/router';
import Loader from '@/components/Loaders/Loader';

interface IProps {
    setShowModal: any
}

const TogglePairMode = ({ setShowModal }: IProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user, isLoadingPairMode, isLoading, isSuccess } = useAppSelector(state => state.user);

    const togglePair = async () => {
        await dispatch(togglePairMode({router: router, move: isSuccess}));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(getUser());
            if(isLoading) {
                setTimeout(() => {
                    setShowModal(false)
                }, 5000)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);


    return (
        <div>
            {isLoadingPairMode && <Loader />}
            <label htmlFor="default-toggle" className="w-16 relative items-center cursor-pointer">
                <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onChange={togglePair} checked={user?.pairmode.isActive} />
                <div
                    className="w-10 h-5 bg-red-500 rounded-full peer peer-checked:after:translate-x-5 dark:bg-mainPurpleHover  peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] 
        after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
        </div>
    )
}

export default TogglePairMode;