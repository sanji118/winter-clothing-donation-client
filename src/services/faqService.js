import axiosInstance from "../hooks/axiosInstance"

export const getFAQs = async () => {
    const result = await axiosInstance.get('/faq');
    return result.data;
}

export const getFAQsBySlug = async (slug) => {
    const res = await axiosInstance.get(`/faq/slug/${slug}`);
    return res.data;
}