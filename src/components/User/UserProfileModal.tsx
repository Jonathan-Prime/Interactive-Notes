import { useAppSelector } from '@/network/hooks'
import { characterLimit, formatDate } from '@/utils/general'
import React from 'react'

const UserProfileModal = () => {
    const { user } = useAppSelector(state => state.user)

    return (
        <div>
            <h1 className='font-bold sm:text-[18px] text[16px]'>User Profile</h1>
            <br />
            <div className='border p-2 rounded-md sm:text-[16px] text-[14px]'>
                <div className='grid grid-cols-2'>
                    <span>Username:</span><span>{characterLimit(user?.username, 14)}</span><br />
                </div>
                <div className='grid grid-cols-2'>
                    <span>Email:</span><span>{characterLimit(user?.email, 14)}</span><br />
                </div>
                <div className='grid grid-cols-2'>
                    <span>Role:</span><span>{user?.role}</span><br />
                </div>
                <div className='grid grid-cols-2'>
                    <span>Date Joined:</span><span>{formatDate(user?.createdAt)}</span><br />
                </div>
            </div>
        </div>
    )
}

export default UserProfileModal