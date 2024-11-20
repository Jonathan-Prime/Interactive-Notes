import Button from '@/components/Button'
import Link from 'next/link'
import Logo from '@/components/Logo'
import type { NextPageWithLayout } from './_app'
import ReviewCard from '@/components/User/ReviewCard'

const Page: NextPageWithLayout = () => {

  return (
    <>
      <div className='flex items-center pt-16 flex-col h-[100vh] dark:bg-veryDarkGrey '>
        <Logo />
        <h1 className='pt-4 pb-3'>Welcome to Interactive Note</h1>
        <div>
          <h3>Log in with your Interactive Note account to continue</h3>
          <div className='flex items-center justify-center space-x-3 mt-3'>
            <Link href={'/auth/login'}>
              <Button text={'Log in'} />
            </Link>
            <Link href={'/auth/signup'}>
              <Button text={'Sign up'} />
            </Link>
          </div>
        </div>
        <ReviewCard />
      </div>
    </>
  )
}

export default Page