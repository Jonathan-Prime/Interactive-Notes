import Modal from '../Modal'
import TaskDetailsModal from '../Modal/TaskDetailsModal'
import React, { useEffect, useState } from 'react'
import EmptyBoard from './EmptyBoard'
import { CircleWavyCheck, Clock } from 'phosphor-react'
import { priorityArr } from '@/utils/data'
import { useAppSelector } from '@/network/hooks'
import NoBoard from './NoBoard'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import moment from 'moment'


interface IProps {
    task: any,
}

const Task = ({ task }: IProps) => {
    const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
    const { user }: any = useAppSelector((state) => state.user);
    const router = useRouter();


    // const getGroupName = (status: any) => {
    //     switch (status) {
    //         case status:
    //             return status;
    //         default:
    //             break;
    //     }
    // };


    // const allTasks = task?.map((el: any) => {
    //     return {
    //         ...el,
    //         groupName: getGroupName(el.status)
    //     }
    // })

    // const groupByName = allTasks && allTasks.reduce((acc: any, obj: any) => {
    //     const key = obj.groupName;
    //     if (!acc[key]) {
    //         acc[key] = [];
    //     }
    //     acc[key].push(obj);
    //     return acc;
    // }, {});


    const getGroupName = (status: any) => {
        switch (status) {
          case status:
            return status;
          default:
            break;
        }
      };
      
      const allTasks = task?.map((el: any) => {
        return {
          ...el,
          groupName: getGroupName(el.status),
        };
      });
      
      const groupByName = allTasks?.reduce((acc: any, obj: any) => {
        const key = obj.groupName;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      
      // Modify groupByName to ensure the group names are in order
      const sortedGroupByName: any = {};
      if (groupByName) {
        const keys = Object.keys(groupByName).sort();
        keys.forEach((key, index) => {
          sortedGroupByName[key] = groupByName[key];
          sortedGroupByName[key].position = index + 1;
        });
      }

    const priorityComponents = (item: any) => priorityArr.map(p => (
        item?.priority === p.name && <span key={p.name}>{p.icon}</span>
    ));

    const EmptyBoardy = () => {
        const query = router.query.id;
        const board = user?.boards?.find((board: any) => board._id === query);

        if (user?.boards.length !== 0 && board) {
            return <EmptyBoard />
        }

    }


    const lists = groupByName && Object.keys(groupByName).map((key) => {
        const items = groupByName[key].map((item: any, i: number) => {
            const showModal = showDetails[item._id];
            const subtaskLength = item?.subTasks?.length
            const completedTaskCount = item?.subTasks?.filter((val: any) => val.isCompleted).length
            const isAllSubtasksCompleted = completedTaskCount === subtaskLength

            return (
                <React.Fragment key={item._id}>
                    <div className='relative update-space'>
                    <motion.li
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96], delay: i * 0.1 }}
                        onClick={() => setShowDetails({ ...showDetails, [item._id]: true })}
                        className='group select-none shadow-main px-4 py-6 rounded-lg cursor-pointer bg-white text-black dark:bg-darkGrey dark:text-white'>
                        {user?.pairmode?.isActive && item?.createdBy &&
                            <div className={`${item?.createdBy?.substring(0, 2) === user?.pairmode?.initials?.substring(0, 2) ? 'bg-white text-mainPurple uppercase absolute -top-2 rounded-full text-[12px] p-1 border border-mainPurple' : 'uppercase absolute -top-2 bg-mainPurple text-white rounded-full text-[12px] p-1'}`}>
                                {item?.createdBy?.substring(0, 2)}
                            </div>}
                        
                            <h4 className="font-bold text-[15px] mb-2 group-hover:text-mainPurple">{item.title}</h4>
                            <div className='flex items-center space-x-3'>
                                <p className="font-bold text-[12px] text-mediumGrey"> {item.subTasks.filter((val: any) => val?.isCompleted).length} of {item?.subTasks.length} subtasks</p>
                                {isAllSubtasksCompleted && subtaskLength !== 0 && <CircleWavyCheck size={20} color="#635FC7" weight="thin" />}
                                {priorityComponents(item)}
                            </div>
                            <div className='flex items-center italic font-bold text-[12px] text-mediumGrey absolute bottom-4 right-4'>
                                <Clock />&nbsp;{moment(item?.createdAt).startOf('seconds').fromNow()}
                            </div>
                       
                    </motion.li>
                    </div>
                    <Modal showModal={showModal} setShowModal={(value) => setShowDetails({ ...showDetails, [item._id]: value })}>
                        <TaskDetailsModal item={item} setShowDetails={setShowDetails} priority={priorityComponents(item)} isAllSubtasksCompleted={isAllSubtasksCompleted} subtaskLength={subtaskLength} />
                    </Modal>
                </React.Fragment>
            );
        });
        return (
            <div key={key} className='column w-[280px] shrink-0'>
                <h3 className="text-[13px] tracking-widest font-bold text-mediumGrey uppercase mb-6">
                    <span className="inline-block h-3 w-3 rounded-full mr-3"></span>
                    {key} ({items?.length})
                </h3>
                <ul className={`scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5 ${user?.pairmode?.isActive && 'pt-3'}`}>
                    {items}
                </ul>

            </div>
        );
    });


    return (
        <>
            {lists?.length ?
                <div
                    className='h-full w-full overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple 
                    scrollbar-track-transparent flex-1 p-4 gap-[20px] bg-lightGrey dark:bg-veryDarkGrey flex'
                >
                    {lists}
                </div> :
                <>
                    {user?.boards.length <= 0 && <NoBoard />}
                    {user?.boards.length > 0 && EmptyBoardy()}
                </>
            }
        </>
    )
}

export default Task;
