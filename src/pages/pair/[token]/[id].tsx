import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from "@/network/hooks";
import { acceptPairInvite } from "@/features/auth/authSlice";
import Loader from "@/components/Loaders/Loader";

const AcceptPairRequest = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (router.isReady && router.query.token) {
      dispatch(acceptPairInvite({ pairToken: router.query.token, id: router.query.id }));
    }
  }, [dispatch, router.isReady, router.query.id, router.query.token]);

  if (!router.isReady || isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center mt-[240px]">
      {message === 'Pair mode activated successfully' ? (
        <div className="veri-board">
          <span>{'Pair mode activated successfully'}</span>
          <div className='text-center pt-4'>
            <Link href={'/user/dashboard'}><span className='border py-2 px-6 rounded-full bg-mainPurple text-white'>Continue</span></Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div>
            <h1> 404 | Page Not Found</h1>
            <div className='text-center pt-4'>
              <Link href={'/user/dashboard'}><span className='border py-2 px-6 rounded-full bg-mainPurple text-white'>Continue</span></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptPairRequest;