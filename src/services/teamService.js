import axiosInstance from "../hooks/axiosInstance"

export const getTeam = async () => {
    const result = await axiosInstance.get('/team');
    return result.data;
}