import { Auth } from '@/features/auth/authSlice';
import { IToken, IUser } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import boardService from './boardService';


const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
const token2 = storedToken ? JSON.parse(storedToken) : '';



interface IBoard {
  board: any,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: any;
}

const initialState: IBoard = {
  board: null,
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


// get board
export const getBoard = createAsyncThunk<{}, { id: string | string[] | undefined; }>(
  'get-board',
  async ({ id }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.getBoard(id, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
      if (error.response && error.response.status === 404) {
        window.location.href = "/user/dashboard"
      }
    }
  }
);



// create board
export const createNewBoard = createAsyncThunk<{}, any>(
  'create-board',
  async ({ boardData, router }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.createNewBoard(boardData, token, router)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)



// edit board
export const editBoard = createAsyncThunk<{}, any>(
  'edit-board',
  async ({ id, boardData }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.editBoard(id, boardData, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)

// delete board
export const deleteBoard = createAsyncThunk<any, any>(
  'delete-board',
  async ({ id, router, user }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      await boardService.deleteBoard(id, token, router, user);
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
);




// Task /////////////////////////////////
// add task
export const addTask = createAsyncThunk<{}, any>(
  'add-task',
  async ({ boardId, taskData }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.addTask(boardId, taskData, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)

// edit task
export const editTask = createAsyncThunk<{}, any>(
  'edit-task',
  async ({ noteId, taskData }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.editTask(noteId, taskData, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)


// delete task
export const deleteTask = createAsyncThunk<any, any>(
  'delete-task',
  async ({ boardId, noteId }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.deleteTask(boardId, noteId, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)

// transfer task
export const transferTask = createAsyncThunk<any, any>(
  'transfer-task',
  async ({ noteId, boardId }, thunkAPI) => {
    const token: IToken = (thunkAPI.getState() as { auth: Auth }).auth.token || token2;
    try {
      return await boardService.transferTask(noteId, boardId, token)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)



export const privateSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.board = action.payload
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
      .addCase(editBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.board = action.payload
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true
      })
      // .addCase(deleteBoard.fulfilled, (state, { payload, payload: { message } }) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.board = state?.board.filter((board: any) => board._id !== payload._id )
      //   state.message = message ?? 'unable to delete board'
      // })


      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if (Array.isArray(state.board)) {
          state.board = state.board.filter((board: any) => board._id !== action?.payload?._id)
        }
        state.message = action?.payload?.message || 'board deleted'
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || 'unable to delete board'
      })

      // tasks
      .addCase(addTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.board = action.payload
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        switch (action.type) {
          case 'SET_MESSAGE': {
            state.message = action.payload as string
            return state
          }
        }
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if (Array.isArray(state.board)) {
          state.board = state.board.filter((board: any) => board._id !== action.payload?._id)
        }
        state.message = action?.payload?.message || 'task deleted'
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || 'unable to delete task'
      })
      .addCase(transferTask.pending, (state) => {
        state.isLoading = true
      })

      .addCase(transferTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action?.payload?.message || 'task deleted'
      })
      .addCase(transferTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || 'unable to delete task'
      })
  },
})

export const { resetBoard } = privateSlice.actions
export default privateSlice.reducer

