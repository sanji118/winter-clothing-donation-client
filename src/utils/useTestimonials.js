import axiosInstance from "../hook/axiosInstance"

export const getTestimonials = async () =>{
    const res = await axiosInstance.get('/testimonials');
    return res.data;
}