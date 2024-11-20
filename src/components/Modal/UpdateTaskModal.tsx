import TextInput from '../shared/TextInput'
import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../shared/Button'
import TextArea from '../shared/TextArea'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { editTask, getBoard } from '@/features/private/boards/boardSlice'
import StatusDropdown from '../shared/StatusDropdown'
import { isEqual } from 'lodash'
// import { Task } from '@src/types'

interface Props {
    task: any,
    setShowUpdateBoardModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewTaskModal = ({ task, setShowUpdateBoardModal, setShowMenu }: Props) => {
    const dispatch = useAppDispatch()
    const { board } = useAppSelector((state) => state.board)

    const arr = board?.notes?.map((val: any) => val.status)
    const status = [...new Set(arr)];

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
        <div>
            <h1 className="text-lg font-bold mb-6">Edit Task</h1>
            <Formik
                initialValues={{
                    title: task?.title,
                    description: task?.description,
                    subTasks: task?.subTasks,
                    status: task?.status,

                }}
                validationSchema={validate}
                onSubmit={(values, { setSubmitting }) => {
                    const isSameValues =
                        values.title === task?.title &&
                        values.description === task?.description &&
                        isEqual(values.subTasks, task?.subTasks) &&
                        values.status === task?.status

                    if (isSameValues) {
                        setSubmitting(false);
                        return;
                    }
                    setSubmitting(true)


                    dispatch(editTask({ noteId: task?._id, taskData: values }))
                    dispatch(getBoard({ id: board?._id }))
                    setSubmitting(false)
                    setShowUpdateBoardModal(false)
                    setShowMenu(false)
                }}
            >
                {(props) => {
                    const isSameValues =
                        props.values.title === task?.title &&
                        props.values.description === task?.description &&
                        isEqual(props.values.subTasks, task?.subTasks) &&
                        props.values.status === task?.status

                    return (
                        <Form onSubmit={props.handleSubmit}>
                            <TextInput label='Title' name={'title'} type="input" placeholder='eg: Take Coffee Break' />
                            <TextArea label="Description" name={'description'} type="text" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." />

                            <label className="body-md text-sm font-bold capitalize text-mediumGrey dark:text-white mt-6 block">
                                subtasks
                            </label>

                            <FieldArray name="subTasks"
                                render={arrayHelpers => (
                                    <div>
                                        {props.values?.subTasks?.map((_: any, i: number) => (
                                            <div key={i} className="flex">
                                                <span className="mb-2 w-full">
                                                <TextInput label='' name={`subTasks.${i}.description`} type="text" placeholder="e.g. Archived" />
                                                </span>

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
                                                className={'bg-[#635FC71A] rounded-full w-full py-[7px] text-mainPurple transition duration-200 text-base hover:bg-mainPurpleHover font-sans'}
                                            >
                                                {'+ Add New Subtask'}
                                            </button>
                                        }
                                    </div>
                                )}
                            />

                            <StatusDropdown
                                status={status && status}
                                setStatus={props.setFieldValue}
                                label={'Status'} />
                            <br />

                            <Button
                                type="submit"
                                disabled={isSameValues}
                                text={'Save Changes'}
                                disabledClass={`${isSameValues && 'disabled'}`}
                                width={"w-full"}
                                padding={'py-[7px]'}
                                color={'text-white'}
                            />
                            {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddNewTaskModal;