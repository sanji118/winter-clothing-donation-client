import axiosInstance from "../hook/axiosInstance"

export const getBlogs = async () =>{
    const res = await axiosInstance.get('/blogs');
    return res.data;
}

export const getBlogById = async (id) => {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
}

export const postCommentToBlog = async ({id, newComment}) => {
    const res = await axiosInstance.post(`blogs/${id}/comments`, newComment);
    return res.data;
}