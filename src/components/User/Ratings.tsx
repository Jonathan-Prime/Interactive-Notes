/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Formik, Form } from 'formik'
import Image from 'next/image'
import TextArea from '../shared/TextArea'
import Button from '../shared/Button'
import StarRatings from 'react-star-ratings';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/network/hooks'
import { postReview } from '@/features/private/review/reviewSlice'
import { getUser } from '@/features/private/user/userSlice'
import Loader from '../Loaders/Loader'


interface IProps {
    setIsRating: any
}

const Ratings = ({ setIsRating }: IProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state?.user)
    const { isLoading } = useAppSelector(state => state?.reviews)

    const validationSchema = Yup.object().shape({
        starRating: Yup.number()
            .required('Please select a star rating')
            .min(1, 'Please select a star rating'),
        comment: Yup.string()
            .required('Please enter a review description')
            .min(10, 'Description must be at least 10 characters')
            .max(160, 'Description must be less than 27 characters'),
    });
    return (
        <div>
            <>{isLoading && <Loader />}</>
            <h1 className='font-bold sm:text-[18px] text[16px]'>i-Rate</h1>
            <div>
                <Image src={'/assets/emoticoo.png'} width={400} height={10} alt={''} />
            </div>
            <h2 className='text-center text-[18px] font-semibold'>Your opinion matters to us!</h2>
            <p className='text-center text-sm pt-2 pb-4'>We work super hard to make Interactive Note
                <span>{user?.reviewedApp !== true ? <span><br /> better for your, and we would love to know: <br />how would you rate our app?</span> : <span> <br />better and We are glad you shared how this <br /> app made you feel.</span>}</span>
            </p>

            {user?.reviewedApp !== true ?

                <Formik
                    initialValues={{
                        username: user?.username,
                        starRating: 0,
                        comment: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        dispatch(postReview({ reviewData: values, userId: user?._id }))
                        dispatch(getUser())
                        setIsRating(false)
                        setSubmitting(false);
                        resetForm();

                    }}
                >
                    {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                            <div className='flex items-center justify-center'>
                                <StarRatings
                                    rating={props.values.starRating}
                                    starRatedColor="#635FC7"
                                    changeRating={(newRating: any) =>
                                        props.setFieldValue('starRating', newRating)
                                    }
                                    numberOfStars={5}
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name="rating"
                                />
                            </div>
                            <span className={"flex items-center justify-center text-xs text-[#E25353] my-2"}>
                                {props.touched.starRating && props.errors.starRating}
                            </span>

                            <TextArea
                                label="Comment"
                                name="comment"
                                type="text"
                                placeholder="Write your review here!"
                            />
                            <Button
                                text="Submit Review"
                                type="submit"
                                width="w-full"
                                padding="py-[7px]"
                                color="text-white"
                            />
                        </Form>
                    )}
                </Formik> :

                <div className='flex items-center justify-center'>
                    <Image src={'/assets/tk_u.png'} width={200} height={10} alt={''} />
                </div>
            }
        </div>
    )
}


export default Ratings;