import axiosInstance from "../hooks/axiosInstance"

export const getUsers = async () => {
    const res = axiosInstance.get('/users');
    return res.data;
}