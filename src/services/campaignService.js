import axiosInstance from "../hooks/axiosInstance"

export const getCampaigns = async () =>{
    const res = await axiosInstance.get('/campaigns');
    return res.data;
}

export const getCampaignById = async (id) => {
    const res = await axiosInstance.get(`/campaigns/id/${id}`);
    return res.data;
}

export const getCampaignBySlug = async (slug) => {
    const res = await axiosInstance.get(`/campaigns/slug/${slug}`);
    return res.data;
}

export const postCommentToCampaign = async ({id, newComment}) => {
    const res = await axiosInstance.post(`campaigns/${id}/comments`, newComment);
    return res.data;
}