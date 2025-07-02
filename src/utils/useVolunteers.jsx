import axiosInstance from "../hook/axiosInstance"

export const getVolunteers = async () =>{
    const res = await axiosInstance.get('/volunteers');
    return res.data;
}