import { useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector, } from "@/network/hooks";
import Logo from "@/components/Logo";
import Link from 'next/link';
import Loader from '@/components/Loaders/Loader';
import { resetPassword } from '@/features/auth/authSlice';
import { useRouter } from 'next/router';


export type ConfirmPasswordResetData = {
    password: string;
    confirmPassword: string
};

const Login = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const { isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const dispatch = useAppDispatch();


    const LoginValidation = yup.object().shape({
        password: yup
            .string()
            // .min(8, "password must be at least at 6 characters")
            // .matches(
            //     /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            //     "Passwords Must contain letters, numbers and special characters"
            //   )
            .required("password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null as any], 'passwords must match')
            .nullable() // allow null as a valid value
            .required('confirm password is required')
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
        <section className="max-w-[400px] w-full mx-auto my-16">
            {isLoading && <Loader />}
            <div className='mx-[16px]'>
                <Logo />
                <h1 className='pt-6 pb-1 font-bold sm:text-[24px] text-[18px] text-center'>Confirm password reset</h1>
                <article className=" pb-8 text-center sm:text-[16px] text-[14px]">
                    Please enter your new password and confirm the password reset.
                </article>

                <div>
                    <Formik
                        validationSchema={LoginValidation}
                        initialValues={{
                            password: "",
                            confirmPassword: ""
                        }}

                        onSubmit={async (
                            values: ConfirmPasswordResetData,
                            { resetForm }: FormikHelpers<ConfirmPasswordResetData>
                        ) => {
                            const data = { ...values, };
                            console.log(data)
                            dispatch(resetPassword({ resetPasswordData: data, resetToken: router.query.resetToken }))
                            resetForm();
                        }}
                    >
                        {(props) => (
                            <form onSubmit={props.handleSubmit}>

                                <label className='opacity-50 pl-2' htmlFor="password">Password</label>
                                <div className='password-input'>
                                    <div>
                                        <input
                                            className="input-class-p"
                                            type={inputType}
                                            value={props.values.password}
                                            onBlur={props.handleBlur("password")}
                                            onChange={props.handleChange("password")}
                                            autoComplete={'off'}
                                        />

                                    </div>
                                    <span className='cursor-pointer' onClick={() => handleToggle()}>{!isVisible ? 'SHOW' : 'HIDE'}</span>
                                </div>
                                <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                                    {props.touched.password && props.errors.password}
                                </span>

                                <br />
                                <label className='opacity-50 pl-2' htmlFor="confirm_password">Confrm Password</label>
                                <div className='password-input'>
                                    <div>
                                        <input
                                            className="input-class-p"
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
                                        {isLoading ? 'Processing...' : 'Confirm Password Reset'}
                                    </button>
                                </div>

                                <div className='text-center pt-4'>
                                    <Link href={'/auth/login'}><span className='text-[#635FC7]'>Back to Apps Client</span></Link>
                                </div>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default Login