import axiosInstance from "../hooks/axiosInstance";

export const getTestimonials = async () => {
  const res = await axiosInstance.get("/testimonials");
  return res.data;
};

export const getTestimonialById = async (id) => {
  const res = await axiosInstance.get(`/testimonials/${id}`);
  return res.data;
};

export const createTestimonial = async (data) => {
  const res = await axiosInstance.post("/testimonials", data);
  return res.data;
};

export const updateTestimonial = async (id, data) => {
  const res = await axiosInstance.patch(`/testimonials/${id}`, data);
  return res.data;
};

export const deleteTestimonial = async (id) => {
  const res = await axiosInstance.delete(`/testimonials/${id}`);
  return res.data;
};
