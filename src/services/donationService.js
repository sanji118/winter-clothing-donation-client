import axiosInstance from "../hooks/axiosInstance"

export const getDonations = async () =>{
    const res = await axiosInstance.get('/donations');
    return res.data;
}

export const getDonationById = async (id) => {
    const res = await axiosInstance.get(`/donations/id/${id}`);
    return res.data;
}

export const getDonationBySlug = async (slug) => {
    const res = await axiosInstance.get(`/donations/slug/${slug}`);
    return res.data;
}