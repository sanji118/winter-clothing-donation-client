import axiosInstance from "../hook/axiosInstance"

export const getCampaigns = async () =>{
    const res = await axiosInstance.get('/campaigns');
    return res.data;
}

export const getCampaignById = async (id) => {
    const res = await axiosInstance.get(`/campaigns/${id}`);
    return res.data;
}