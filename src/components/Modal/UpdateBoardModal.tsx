import TextInput from '../shared/TextInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import Button from '../shared/Button'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { editBoard, getBoard } from '@/features/private/boards/boardSlice'
import { getUser } from '@/features/private/user/userSlice'

interface props {
    setShowUpdateBoardModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateBoardModal = ({ setShowUpdateBoardModal }: props) => {
    const dispatch = useAppDispatch();
    const { board } = useAppSelector((state) => state.board)

    const validate = Yup.object({
        title: Yup.string().required("Board title is required"),
    })


    return (
        <div>
            <h1 className="text-lg font-bold mb-6">Edit Board</h1>
            <Formik
                validationSchema={validate}
                initialValues={{
                    title: board?.title
                }}
                enableReinitialize={true}

                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                    if (values.title === board?.title) {
                        
                        setSubmitting(false);
                        setShowUpdateBoardModal(false);
                        return;
                    }

                    dispatch(editBoard({ id: board?._id, boardData: values }))
                    dispatch(getUser())
                    setTimeout(() => {
                        dispatch(getBoard({ id: board?._id }))
                    }, 1000);
                    setSubmitting(false)
                    setShowUpdateBoardModal(false)
                    // setShowMenu(false)
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <TextInput label='Board Name' name="title" type="input" placeholder='eg: Web Design' />
                        <br />

                        <Button type="submit" disabled={isSubmitting} text={'Save Changes'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UpdateBoardModal;



