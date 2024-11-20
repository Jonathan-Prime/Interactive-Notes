import TextInput from '../shared/TextInput'
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import TextArea from '../shared/TextArea'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { addTask, getBoard } from '@/features/private/boards/boardSlice'
import StatusDropdown from '../shared/StatusDropdown'
import PriorityDropdown from '../shared/PriorityDropdown'
import { AnimatePresence } from 'framer-motion'
import Button from '../Button'

interface IProps {
    setShowModal: any
}

const AddNewTaskModal = ({ setShowModal }: IProps) => {
    const dispatch = useAppDispatch()
    const { board } = useAppSelector((state) => state.board)
    const { user } = useAppSelector((state) => state.user)

    const validate = Yup.object({
        title: Yup.string().required("required"),
        description: Yup.string().required("required"),
        status: Yup.string().required("required"),
        subTasks: Yup.array().of(
            Yup.object().shape({
                description: Yup.string().required("Subtask description is required"),
            })
        ),
    })


    const arr = board?.notes?.map((val: any) => val.status)
    const status = [...new Set(arr)];


    return (
        <AnimatePresence>
            <div>
                <h1 className="sm:text-lg text-base font-bold sm:mb-6 mb-3">+ Add New Task</h1>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        status: '',
                        priority: '',
                        createdBy:user?.username,
                        subTasks: [],
                    }}

                    validationSchema={validate}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)

                        console.log('submit:', values);
                        dispatch(addTask({ boardId: board?._id, taskData: values }))
                        dispatch(getBoard({ id: board?._id }))
                        resetForm()
                        dispatch(getBoard({ id: board?._id }))
                        dispatch(getBoard({ id: board?._id }))
                        setShowModal(false)
                        dispatch(getBoard({ id: board?._id }))
                    }}
                >
                    {/* {({ values,  isSubmitting, handleSubmit }) => ( */}
                    {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                            <TextInput label='Title' name={'title'} type="input" placeholder='eg: Take Coffee Break' />
                            <TextArea label="Description" name={'description'} type="text" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." />

                            <label className="body-md text-sm font-bold capitalize text-mediumGrey dark:text-white mt-6 block">
                                subtasks
                            </label>

                            <FieldArray name="subTasks"
                                render={arrayHelpers => (
                                    <div>
                                        {props.values?.subTasks?.map((_, i) => (
                                            <div key={i} className="flex">
                                                <TextInput label='' name={`subTasks.${i}.description`} type="text" placeholder="e.g. Archived" />

                                                <button onClick={() => arrayHelpers.remove(i)}
                                                    className="text-mediumGrey hover:text-mainRed ml-4"
                                                >
                                                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                                        <g fill="currentColor" fillRule="evenodd">
                                                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        <br />

                                        {props.values?.subTasks?.length <= 4 &&
                                            <button
                                                type='button'
                                                onClick={() => arrayHelpers.push({ description: "" })}
                                                className={'bg-[#635FC71A] rounded-full w-full py-[7px] mb-3 text-mainPurple transition duration-200 text-base hover:bg-mainPurpleHover font-sans'}
                                            >
                                                {'+ Add New Subtask'}
                                            </button>
                                        }
                                    </div>
                                )}
                            />

                            <StatusDropdown status={status && status} setStatus={props?.setFieldValue} label={'Status'} />
                            <PriorityDropdown setStatus={props?.setFieldValue} label={'Priority'} /> <br />

                            <Button text="Save Changes" type='submit' width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                            {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </AnimatePresence>
    )
}

export default AddNewTaskModal;