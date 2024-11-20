import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getBoard } from '@/features/private/boards/boardSlice';
import Task from '@/components/Board/Task';
import { withAuth } from '@/middlewares/middleware';
import { getUser } from '@/features/private/user/userSlice';

const BoardDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { board } = useAppSelector((state) => state.board);
  const { user } = useAppSelector((state) => state.user);


  useEffect(() => {
    const fetchBoardAndUser = async () => {
      dispatch(getBoard({ id: router.query.id }));
      dispatch(getUser());
    };
  
    if (router.query.id) {
      fetchBoardAndUser();
    }
  }, [dispatch, router.query.id, user?.pairmode.isActive]);
  
  
  
 
  return (
    <Layout>
      <Task task={board?.notes} />
    </Layout>
  )
}

export default withAuth(BoardDetails)
// export default BoardDetails
