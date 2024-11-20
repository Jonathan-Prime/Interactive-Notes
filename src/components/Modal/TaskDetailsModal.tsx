import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../shared/Button'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { editTask, getBoard } from '@/features/private/boards/boardSlice'
import React from 'react'
import EditButton from '../shared/EditButton';
import StatusDropdown from '../shared/StatusDropdown';
import SubTaskItem from './SubTaskItem';
import { CircleWavyCheck, Clock } from 'phosphor-react'
import PriorityDropdown from '../shared/PriorityDropdown'
import { isEqual } from 'lodash'
import moment from 'moment'

interface IProps {
  item: any;
  setShowDetails: any,
  subtaskLength: number,
  isAllSubtasksCompleted: any,
  priority: any
}

const TaskDetailsModal = ({ item, setShowDetails, subtaskLength, isAllSubtasksCompleted, priority }: IProps) => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board)
  const { user } = useAppSelector((state) => state.user)

  const arr = board?.notes?.map((val: any) => val.status)

  const status = [...new Set(arr)];

  const onChangeSubtaskStatus = (description: string) => {
    const newSubTasks = item?.subTasks.map((subtask: any) => {
      if (subtask.description === description) {
        return {
          ...subtask,
          isCompleted: !subtask.isCompleted,
        };
      }
      return subtask;
    });


    const newTask = { ...item, subTasks: newSubTasks };
    dispatch(editTask({ noteId: item?._id, taskData: newTask }));
    dispatch(getBoard({ id: board?._id }))
  };

  const validate = Yup.object({
    title: Yup.string().required("required"),
    status: Yup.string().required("required"),
    subTasks: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().required("Subtask description is required"),
      })
    ),
  })




  return (
    <div className='relative'>
      <div className="flex items-center justify-between gap-4 sm:mb-6 mb-4">
        <h1 className="sm:text-[18px]  text-16px font-bold">{item?.title}</h1>
        <EditButton setShowDetails={setShowDetails} task={item} type='' className={'-bottom-22 -left-44 border '} />
      </div>
      <p className="text-[13px] text-mediumGrey">
        {item.description ? item?.description : 'no description'}
      </p>

      <div className='flex items-center space-x-3 pt-3 pb-2'>
        <p className="font-bold text-[12px] text-mediumGrey"> {item.subTasks.filter((val: any) => val.isCompleted).length} of {item.subTasks.length} subtasks</p>
        {isAllSubtasksCompleted && subtaskLength !== 0 && <CircleWavyCheck size={20} color="#635FC7" weight="thin" />}
        {priority}
        <div className='flex items-center italic font-bold text-[12px] text-mediumGrey'>
          <Clock />&nbsp;{moment(item?.createdAt).startOf('seconds').fromNow()}
        </div>
      </div>
     

      {
        item?.subTasks?.map((subtask: any, i: number) => {
          return <SubTaskItem subtask={subtask} i={i} key={i}
            onChangeSubtaskStatus={() => onChangeSubtaskStatus(subtask.description)}
          />
        })
      }

      <Formik
        initialValues={{
          title: item?.title,
          description: item?.description,
          subTasks: item?.subTasks,
          status: item?.status,
          priority: item?.priority
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const isSameValues =
            values.title === item?.title &&
            values.description === item?.description &&
            isEqual(values.subTasks, item?.subTasks) &&
            values.status === item?.status &&
            values.priority === item?.priority;

          if (isSameValues) {
            setSubmitting(false);
            return;
          }

          setSubmitting(true);
          dispatch(editTask({ noteId: item?._id, taskData: values }));
          dispatch(getBoard({ id: board?._id }));
          setSubmitting(false);
          setShowDetails(false);
        }}
      >
        {(props) => {
          const isSameValues =
            props.values.title === item?.title &&
            props.values.description === item?.description &&
            isEqual(props.values.subTasks, item?.subTasks) &&
            props.values.status === item?.status &&
            props.values.priority === item?.priority;

          return (
            <Form onSubmit={props.handleSubmit}>
              <StatusDropdown status={status && status} setStatus={props.setFieldValue} label={'Status'} />
              <PriorityDropdown setStatus={props.setFieldValue} label={'Priority'} /> <br />
              <Button
                type="submit"
                disabled={isSameValues}
                text={'Move Task / Update Priority'}
                disabledClass={`${isSameValues && 'disabled'}`}
                width={"w-full"}
                padding={'py-[7px]'}
                color={'text-white'}
              />
            </Form>
          );
        }}
      </Formik>


    </div>
  )
}

export default TaskDetailsModal;