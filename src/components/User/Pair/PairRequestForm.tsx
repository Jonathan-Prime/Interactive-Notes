import Loader from '@/components/Loaders/Loader';
import { sendPairInvite } from '@/features/private/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'


export type ForgotPasswordData = {
    email: string;
};

const PairRequestForm = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.user)
    const PairRequestValidation = yup.object().shape({
        email: yup
            .string()
            .email("Please provide a valid email address")
            .required("valid email of another user is required"),
    });

    return (

        <div>
            {isLoading && <Loader />}
            <h1></h1>
            <h1 className='pb-3 sm:text-[20px] text[16px] font-bold'>Pair Mode</h1>
            <article className='text-sm pb-4'>
                Pair mode is a powerful way for two people to collaborate on a task. It involves working together in real-time,
                sharing ideas and knowledge to achieve a common goal. Connect with a team mate now!
            </article>

            <Formik
                validationSchema={PairRequestValidation}
                initialValues={{
                    email: "",
                }}
                onSubmit={async (
                    values: ForgotPasswordData,
                    { resetForm }: FormikHelpers<ForgotPasswordData>
                ) => {
                    const data = { ...values, };
                    dispatch(sendPairInvite({invitePayload: data}));
                    resetForm();
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <div className="input-container">
                            <label className='opacity-50 pl-2' htmlFor="email">Pair&apos;s Email</label>
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
                            >
                                Send Invite
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default PairRequestForm