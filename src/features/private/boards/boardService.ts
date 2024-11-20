import { IToken } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'


const toastOptions = {
  autoClose: 2000,
  hideProgressBar: true,
};


// Get board
const getBoard = async (id: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/get-board/${id}`, config)
  return data
}


const createNewBoard = async (boardData: unknown, token: IToken, router: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/create-board`, boardData, config)

  const boardId = data?._id
  router.push(`/user/board/${boardId}`)

  toast.success(data?.message, toastOptions);
  return data
}

// create board
const editBoard = async (id: any, boardData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/edit-board/${id}`, boardData, config)
  toast.success(data?.message, toastOptions);
  return data
}

// delete board
const deleteBoard = async (id: string, token: IToken, router: any, user: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/delete-board/${id}`, config)
  if (data) {
    router.push('/user/dashboard')
  }

  toast.success(data?.message, toastOptions);
  return data
}

// add Task
const addTask = async (boardId: any, taskData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/create-note/${boardId}`, taskData, config)
  toast.success(data?.message, toastOptions);
  return data
}

// edit Task
const editTask = async (nodeId: any, taskData: unknown, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/update-note/${nodeId}`, taskData, config)
  toast.success(data?.message, toastOptions);
  return data
}

// delete Task
const deleteTask = async (boardId: any, noteId: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/deleteNote/${boardId}/${noteId}`, config)
  toast.success(data?.message, toastOptions);
  return data
}

// delete Task
const transferTask = async (noteId: any, boardId: any, token: IToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/private/push-note-to-board/${noteId}/${boardId}`, {}, config)
  toast.success(data?.message, toastOptions);
  return data
}




const userService = {
  getBoard,
  createNewBoard,
  editBoard,
  deleteBoard,

  addTask,
  editTask,
  deleteTask,
  transferTask

}
export default userService