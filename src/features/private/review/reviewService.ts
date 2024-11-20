import { IToken } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'


const toastOptions = {
  autoClose: 2000,
  hideProgressBar: true,
};



// Get review
const getAllReviews = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/get-all-reviews`, config)
  return data
}

// create review
const postReview = async (reviewData: unknown, userId:any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/post-review/${userId}`, reviewData, config)

  toast.success(data?.message, toastOptions);
  return data
}

// create review
const editReview = async (id: any, reviewData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/edit-review/${id}`, reviewData, config)
  toast.success(data?.message, toastOptions);
  return data
}




const reviewService = {
  getAllReviews,
  postReview,
  editReview,
 
}
export default reviewService;