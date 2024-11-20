import { useAppSelector } from '@/network/hooks'
import { MagnifyingGlass } from 'phosphor-react'
import React, { useState } from 'react'

interface Props {
  setFilteredSearch: any
}

const Search = ({ setFilteredSearch }: Props) => {
  const { user } = useAppSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    setFilteredSearch(value === '' ? user?.boards : user?.boards?.filter(val => val.title.toLowerCase().includes(value)));
  };

  return (
    <div className='flex space-x-2 items-center text-gray-300 px-2 shadow-main dark:shadow-0 dark:bg-veryDarkGrey mb-4 mx-4 rounded-[5px]'>
      <MagnifyingGlass size={18} color="#b5b5b5" weight="bold" />
      <input value={searchTerm} onChange={handleInputChange} className='w-full py-2 border-0 outline-none  dark:bg-veryDarkGrey' type="email" placeholder='Search boards' />
    </div>
  )
}

export default Search