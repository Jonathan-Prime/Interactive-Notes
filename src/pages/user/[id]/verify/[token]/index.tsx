import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import Loader from "../../../../../components/Loaders/Loader";
import { useAppDispatch, useAppSelector } from "@/network/hooks";
import { verifyEmail } from "@/features/auth/authSlice";

const VerifyEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, message } = useAppSelector((state) => state.auth)


  useEffect(() => {
    if (router.isReady && router.query.token) {
      dispatch(verifyEmail({ id: router.query.id, verifyToken: router.query.token }))
    }
  }, [dispatch, router.isReady, router.query.id, router.query.token]);

  if (!router.isReady || isLoading) {
    return <Loader />;
  }


  return (
    <>
      <div className="flex items-center justify-center mt-[240px]">
        {message === 'Email Verified Successfully' ? (
          <div className="veri-board">
            <span>{'Email Verified Successfully'}</span>
            <div className='text-center pt-4'>
              <Link href={'/auth/login'}><span className='text-[#635FC7]'>Login</span></Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div>
              <h1> 404 | Page Not Found</h1>
              <div className='text-center pt-4'>
              <Link href={'/'}><span className='text-[#635FC7] underline'>Home</span></Link>
            </div>
              <Image src="/assets/f_o_f.gif" height={10} width={150} alt={""}/>
            </div>
          </div>
        )}
      </div>
    </>
  );

};

export default VerifyEmail;