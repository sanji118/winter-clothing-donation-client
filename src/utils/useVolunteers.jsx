import axiosInstance from "../hook/axiosInstance"

export const getVolunteers = async () =>{
    const res = await axiosInstance.get('/volunteers');
    return res.data;
}

export const getVolunteerById = async (id) =>{
    const res = await axiosInstance.get(`/volunteers/${id}`);
    return res.data;
}