import { IUserLogin, IUserSignUp, IUserForgotPassword } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";

const signup = async (userData: IUserSignUp) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/signup`,
    userData
  );

  toast.success(response?.data?.message as string, { autoClose: false });
  return response;
};

const login = async (userData: IUserLogin) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
    userData
  );

  if (data?.token) {
    localStorage.setItem("authToken", JSON.stringify(data.token));
  }
  return data;
};

const requestPasswordReset = async (userData: IUserForgotPassword) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgotpassword`,
    userData
  );

  toast.success(response?.data?.data as string, { autoClose: false });
  return response?.data?.message;
};

const resetPassword = async (
  resetPasswordData: IUserForgotPassword,
  resetToken: any
) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/reset-password/${resetToken}`,
    resetPasswordData
  );

  toast.success(response.data.message as string, { autoClose: false });
  console.log("response", response?.data?.message);
  return response?.data?.message;
};

const verifyEmail = async (id: string, verifyToken: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/${id}/verify/${verifyToken}`
  );

  toast.success(response.data.message as string, { autoClose: false });
  console.log("response", response);
  return response?.data?.message;
};

const acceptPairInvite = async (pairToken: string, id: string) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/private/accept-pair/${pairToken}/${id}`
  );

  toast.success(response.data.message as string, { autoClose: false });
  console.log("response", response);
  return response?.data?.message;
};

const logout = () => {
  localStorage.removeItem("authToken");
};

const authService = {
  signup,
  login,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  acceptPairInvite,
  logout,
};
export default authService;
