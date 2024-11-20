import { changePassword } from '@/features/private/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import * as yup from 'yup'

export type ChangePassworData = {
    password: string;
    newPassword: string;
    confirmPassword: string
};

interface IProps {
    setIsChangePasswordModal: any
}


const ChangePassword = ({ setIsChangePasswordModal }: IProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const { isLoading } = useAppSelector((state) => state.auth);
    const { user } = useAppSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useAppDispatch();


    const passwordValidation = yup.object().shape({
        password: yup
            .string()
            // .min(8, "password must be at least at 6 characters")
            .required("old password is required"),
        newPassword: yup
            .string()
            // .min(8, "password must be at least at 6 characters")
            .required("new password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null as any], 'passwords must match')
            .nullable() // allow null as a valid value
            .required('confirm new password is required')
    });

    const handleToggle = () => {
        if (inputType === "password") {
            setInputType('text')
            setIsVisible(!isVisible)
        } else {
            setInputType('password')
            setIsVisible(!isVisible)
        }
    }

    return (
        <div>
            <h1 className='sm:pb-6 pb-3 sm:text-[20px] text[16px] font-bold'>Change password</h1>
            <div>
                <Formik
                    validationSchema={passwordValidation}
                    initialValues={{
                        password: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        const data = { ...values, };
                        dispatch(changePassword({ changePasswordData: data, userId: user?._id }))
                        setSubmitting(false)
                        // setIsChangePasswordModal(false)
                        resetForm();
                    }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>

                            <label className='opacity-50 pl-1 text-[15px] ' htmlFor="password">Old Password</label>
                            <div className='password-input chp'>
                                <div>
                                    <input
                                        className="input-class-p "
                                        type={'password'}
                                        value={props.values.password}
                                        onBlur={props.handleBlur("password")}
                                        onChange={props.handleChange("password")}
                                        autoComplete={'off'}
                                    />

                                </div>
                            </div>
                            <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.password && props.errors.password}
                            </span> <br />
                            <label className='opacity-50 pl-1 text-[15px] pt-4' htmlFor="password">New Password</label>
                            <div className='password-input chp'>
                                <div>
                                    <input
                                        className="input-class-p"
                                        type={inputType}
                                        value={props.values.newPassword}
                                        onBlur={props.handleBlur("newPassword")}
                                        onChange={props.handleChange("newPassword")}
                                        autoComplete={'off'}
                                    />

                                </div>
                                <span className='cursor-pointer' onClick={() => handleToggle()}>{!isVisible ? 'SHOW' : 'HIDE'}</span>
                            </div>
                            <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.newPassword && props.errors.newPassword}
                            </span>

                            <br />
                            <label className='opacity-50 pl-1 text-[15px]' htmlFor="confirm_password">Confirm New Password</label>
                            <div className='password-input chp'>
                                <div>
                                    <input
                                        className="input-class-p "
                                        type={'password'}
                                        value={props.values.confirmPassword}
                                        onBlur={props.handleBlur("confirmPassword")}
                                        onChange={props.handleChange("confirmPassword")}
                                        autoComplete={'off'}
                                    />

                                </div>
                            </div>
                            <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                {props.touched.confirmPassword && props.errors.confirmPassword}
                            </span>

                            <br />
                            <div className="my-2 lg:block flex justify-center items-center">
                                <button
                                    type='submit'
                                    className='gen-btn-class w-full py-3 rounded-[5px] text-[18px]'
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ChangePassword