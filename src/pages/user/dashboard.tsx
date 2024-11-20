import React, { useEffect } from 'react'
import { getUser } from '../../features/private/user/userSlice'
import { useAppDispatch, useAppSelector } from "@/network/hooks"
import { withAuth } from '@/middlewares/middleware'
import Layout from '@/components/Layout'
import Task from '@/components/Board/Task'
import { getBoard, resetBoard } from '@/features/private/boards/boardSlice'
import { useRouter } from 'next/router'
import { useActive } from '@/hooks/useActive'
import DashBoardStats from '@/components/DashBoardStats'


const Dashboard = () => {
  const { board } = useAppSelector((state) => state.board);
  const { user } = useAppSelector((state) => state.user);
  const active = useActive(1000)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router?.query.id;
  const boardCheck = user?.boards?.find((board: any) => board?._id === query);


  function autoRefresh() {
    let intervalId: NodeJS.Timeout | null = null;

    const startInterval = () => {
      intervalId = setInterval(() => {
        dispatch(getUser());
        if (boardCheck) {
          dispatch(getBoard({ id: router.query.id }));
        }
      }, 1000000); // Refresh every 1 min
    }

    if (user?.pairmode.isActive) {
      if (!intervalId) {
        startInterval();
      }
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  }

  useEffect(() => {
    autoRefresh();
  }, [dispatch, user?.pairmode.isActive]);

  function refresh() {
    dispatch(getUser())
    if (boardCheck) {
      dispatch(getBoard({ id: router.query.id }))
    }
  }


  useEffect(() => {
    active && user?.pairmode.isActive && refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, active]);


  useEffect(() => {
    dispatch(getUser())
    dispatch(resetBoard())
  }, [dispatch, board])


  return (
    <Layout>
      {/* <Task task={board?.notes} /> */}
      <DashBoardStats />
    </Layout>
  )
}

export default withAuth(Dashboard);
