import axiosInstance from "../hook/axiosInstance"

export const getFAQs = async () => {
    const result = await axiosInstance.get('/faq');
    return result.data;
}