import axiosInstance from "../hook/axiosInstance"

export const getTeam = async () => {
    const result = await axiosInstance.get('/team');
    return result.data;
}