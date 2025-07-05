import axiosInstance from "../hook/axiosInstance"

export const getDonations = async () =>{
    const res = await axiosInstance.get('/donations');
    return res.data;
}

export const getDonationById = async (id) => {
    const res = await axiosInstance.get(`/donations/${id}`);
    return res.data;
}