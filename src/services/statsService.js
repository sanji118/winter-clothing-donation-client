import axiosInstance from "../hooks/axiosInstance"

export const getAdminStats = async () => {
    const result = await axiosInstance('/stats');
    return result.data;
}