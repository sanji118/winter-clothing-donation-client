import axiosInstance from "../hooks/axiosInstance";

export const getBlogs = async () => {
  const res = await axiosInstance.get("/blogs");
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await axiosInstance.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog = async (blogData) => {
  const res = await axiosInstance.post("/blogs", blogData);
  return res.data;
};

export const updateBlog = async (id, blogData) => {
  const res = await axiosInstance.patch(`/blogs/${id}`, blogData);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axiosInstance.delete(`/blogs/${id}`);
  return res.data;
};


export const postCommentToBlog = async ({id, newComment}) => {
    const res = await axiosInstance.post(`blogs/${id}/comments`, newComment);
    return res.data;
}