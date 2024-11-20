// import { getBoard, resetBoard } from "@/features/private/boards/boardSlice"
// import { getUser } from "@/features/private/user/userSlice"
// import { useEffect, useState } from "react"
// import { useActive } from "./useActive"

// export function useAutoRefresh(user: any, boardCheck: boolean, dispatch: any, router: any): void {
//     // const dispatch = useAppDispatch();
//     const active = useActive(1000)
  
//     // const router = useRouter();
//     // const query = router?.query.id;
//     // const boardCheck = user?.boards?.find((board: any) => board?._id === query);
//     const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  
//     const startInterval = () => {
//       setIntervalId(
//         setInterval(() => {
//           dispatch(getUser())
//           if (boardCheck) {
//             dispatch(getBoard({ id: router.query.id }))
//           }
//           dispatch(resetBoard())
//         }, 5000)
//       )
//     }
  
//     useEffect(() => {
//       if (user?.pairmode.isActive && active) {
//         startInterval()
//         setTimeout(() => {
//           clearInterval(intervalId!)
//           setIntervalId(null)
//         }, 300000) // Stop after 5 minutes
//       } else {
//         clearInterval(intervalId!)
//         setIntervalId(null)
//       }
//     }, [user?.pairmode.isActive, boardCheck, dispatch, router.query.id, intervalId])
//   }



 // function autoRefresh() {
  //   let intervalId: NodeJS.Timeout | null = null;
    
  //   const startInterval = () => {
  //     intervalId = setInterval(() => {
  //       dispatch(getUser());
  //       if(boardCheck) {
  //         dispatch(getBoard({id: router.query.id}));
  //       }
  //       dispatch(resetBoard());
  //     }, 8000); // Refresh every 5 seconds
  //   }
  
  //   if (user?.pairmode.isActive && active) {
  //     if (!intervalId) {
  //       startInterval();
  //     }
  //   } else {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //       intervalId = null;
  //     }
  //   }
  // }

  // useEffect(() => {
  //   autoRefresh();
  // }, [user?.pairmode.isActive, active]);

  // dispatch(getUser());
  // if(boardCheck) {
  //   dispatch(getBoard({id: router.query.id}));
  // }
  // dispatch(resetBoard());
  

  // useEffect(() => {
  //   dispatch(getUser())
  //   dispatch(resetBoard())
  // }, [dispatch, user?.pairmode.isActive])


 
