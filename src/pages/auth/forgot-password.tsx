import { useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector, } from "@/network/hooks";
import Logo from "@/components/Logo";
import Link from 'next/link';
import Loader from '@/components/Loaders/Loader';
import { requestPasswordReset } from '@/features/auth/authSlice';


export type ForgotPasswordData = {
    email: string;
};

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const [buttonDisabled, setButtonDisabled] = useState(false); 
    const { isLoading } = useAppSelector((state) => state.auth);

    const LoginValidation = yup.object().shape({
        email: yup
            .string()
            .email("Please provide a valid email address")
            .required("email is required"),
    });


    return (
        <section className="max-w-[400px] w-full mx-auto my-16">
            {/* {isLoading && <Loader />} */}
            <div className='mx-[16px]'>
                <Logo />
                <h1 className='pt-6 pb-1 font-bold sm:text-[24px] text-[18px] text-center'>Reset your password</h1>
                <article className=" pb-8 text-center sm:text-[16px] text-[14px]">
                    Enter your email address and we will send you instructions to reset your password.
                </article>

                <div>
                    <Formik
                        validationSchema={LoginValidation}
                        initialValues={{
                            email: "",
                        }}
                        onSubmit={async (
                            values: ForgotPasswordData,
                            { resetForm }: FormikHelpers<ForgotPasswordData>
                        ) => {
                            const data = { ...values, };
                            dispatch(requestPasswordReset(data));
                            resetForm();
                            setButtonDisabled(true); 
                            setTimeout(() => {
                                setButtonDisabled(false);
                            }, 60000);
                        }}
                    >
                        {(props) => (
                            <form onSubmit={props.handleSubmit}>
                                <div className="input-container">
                                    <label className='opacity-50 pl-2' htmlFor="email">Email</label>
                                    <input
                                        className="input-class"
                                        type="text"
                                        value={props.values.email}
                                        onBlur={props.handleBlur("email")}
                                        onChange={props.handleChange("email")}
                                    />
                                    <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all"}>
                                        {props.touched.email && props.errors.email}
                                    </span>
                                </div>

                                <br />
                                <div className="my-2 lg:block flex justify-center items-center">
                                    <button
                                        type='submit'
                                        className='gen-btn-class w-full py-3 rounded-[5px] text-[18px]'
                                        disabled={buttonDisabled}
                                    >
                                        {isLoading ? 'Processing...' : 'Continue'}
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

export default ForgotPassword;






