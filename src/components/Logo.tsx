import Link from "next/link"

const Logo = () => {
    return (
        <Link href={'/'}>
            <div className='h-[60px] w-[60px] mx-auto flex items-center justify-center border-[3px] border-gray-300 rounded-full'>
                <h1 className='font-bold text-mainPurple'>
                    Interactive Note
                </h1>
            </div>
        </Link>
    )
}

export default Logo