import TextInput from '../shared/TextInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import Button from '../shared/Button'
import { createNewBoard } from '../../features/private/boards/boardSlice'
import { useAppDispatch } from '../../network/hooks'
import { getUser } from '@/features/private/user/userSlice'
import { useRouter } from 'next/router'



interface IProps {
    showModal: boolean,
    setShowModal: (val: boolean) => void;
}


const CreateNewBoard = ({ showModal, setShowModal }: IProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const validate = Yup.object({
        title: Yup.string().required("Board title is required"),
    })


    return (
        <div>
            <h1 className="text-lg font-bold mb-6">Add New Board</h1>
            <Formik
                initialValues={{
                    title: "",
                }}
                validationSchema={validate}

                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)

                    const data = { ...values, };
                    dispatch(createNewBoard({boardData: data, router: router}))
                    dispatch(getUser())
                    setSubmitting(false)
                    resetForm()
                    setShowModal(!showModal)
                    dispatch(getUser())
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <TextInput label='Board Name' name="title" type="input" placeholder='eg: Web Design' />

                        <br />

                        <Button type="submit"
                            text={'Save Changes'} width={"w-full"} padding={'py-[7px]'} color={'text-white'} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateNewBoard;