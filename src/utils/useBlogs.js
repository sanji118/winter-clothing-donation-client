import axiosInstance from "../hook/axiosInstance"

export const getBlogs = async () =>{
    const res = await axiosInstance.get('/blogs');
    return res.data;
}

export const getBlogById = async (id) => {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
}