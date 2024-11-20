import { Auth } from '@/features/auth/authSlice';
import { IToken } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import reviewService from './reviewService';


const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
const token2 = storedToken ? JSON.parse(storedToken) : '';


interface IReview {
  reviews: any,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: any;
}

const initialState: IReview = {
  reviews: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


function errorHandler(error: { response: { data: { error: any; }; }; message: any; toString: () => any; }, thunkAPI: { rejectWithValue: (arg0: any) => any; }) {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.error) ||
    error.message ||
    error.toString()
  toast.error(message, { autoClose: 1000 });
  return thunkAPI.rejectWithValue(message)
}


// get all reviews
export const getAllReviews = createAsyncThunk<{},  void >(
  'get-all-reviews',
  async (_, thunkAPI) => {
    try {
      return await reviewService.getAllReviews()
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
);



// post review
export const postReview = createAsyncThunk<{}, any>(
  'post-review',
  async ({reviewData, userId}, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await reviewService.postReview(reviewData, userId, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)



// edit review
export const editReview = createAsyncThunk<{}, any>(
  'edit-review',
  async ({ id, reviewData }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await reviewService.editReview(id, reviewData, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)





export const privateSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviews: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews = action.payload
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
      .addCase(postReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
      .addCase(editReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.board = action.payload
      })
      .addCase(editReview.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
  },
})

export const { resetReviews } = privateSlice.actions
export default privateSlice.reducer

