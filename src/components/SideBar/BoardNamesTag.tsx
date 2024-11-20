import React, { useState } from 'react'
import CreateNewBoardCTA from './CreateNewBoardCTA'
import { useAppSelector } from '../../network/hooks'
import { useRouter } from 'next/router'
import { characterLimit } from '@/utils/general'
import { MagnifyingGlass } from 'phosphor-react'
import Search from '../shared/Search'



const BoardNamesTag = () => {
    const { user } = useAppSelector(state => state.user)
    const router = useRouter();
    const [filteredSearch, setFilteredSearch] = useState(user?.boards)


   






    const boardNameTag = filteredSearch?.map((val: any, i: any) => (
        <div
            key={i}
            className={`py-3 text-mediumGrey flex items-center rounded-r-3xl mr-6 text-base font-bold gap-3 pl-6 -ml-1 cursor-pointer hover:bg-lightGrey ease transition duration-500 ${router?.query?.id === val._id ? "bg-mainPurple text-white hover:bg-mainPurple" : ""
                }`}
            onClick={() => router.push(`/user/board/${val?._id}`)}
        >
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill="currentColor"
                />
            </svg>
            {characterLimit(val?.title, 20)}
        </div>
    ));


    return (
        <div>
            <div className='font-bold text-sm text-mediumGrey tracking-widest pl-6 pt-7 pb-2 uppercase'>all boards ({user ? filteredSearch?.length : 0})</div>

          <Search setFilteredSearch={setFilteredSearch} />

            <div className='h-[300px] scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll mb-2'>
                {boardNameTag}
                {filteredSearch && filteredSearch.length === 0 && (
                    <p className='text-xs py-8 text-center font-thin opacity-80'>No boards found</p>
                )}

            </div>
            <CreateNewBoardCTA />
        </div>
    )
}

export default BoardNamesTag
