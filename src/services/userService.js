import axiosInstance from "../hooks/axiosInstance"

export const getUsers = async () => {
    const res = await axiosInstance.get('/users');
    return res.data;
}

export const updateUserRole = async (userId, roleData) => {
    const res = await axiosInstance.patch(`/users/${userId}/role`, roleData);
    return res.data;
}