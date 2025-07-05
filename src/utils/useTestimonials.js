import axiosInstance from "../hook/axiosInstance"

export const getTestimonials = async () =>{
    const res = await axiosInstance.get('/testimonials');
    return res.data;
}

export const getTestimonialById = async (id) => {
    const res = await axiosInstance.get(`/testimonials/${id}`);
    return res.data;
}