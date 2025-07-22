import axiosInstance from "../hooks/axiosInstance";

export const getFaqs = async () => {
  const res = await axiosInstance.get("/faqs");
  return res.data;
};

export const getFaqById = async (id) => {
  const res = await axiosInstance.get(`/faqs/${id}`);
  return res.data;
};

export const createFaq = async (data) => {
  const res = await axiosInstance.post("/faqs", data);
  return res.data;
};

export const updateFaq = async (id, data) => {
  const res = await axiosInstance.patch(`/faqs/${id}`, data);
  return res.data;
};

export const deleteFaq = async (id) => {
  const res = await axiosInstance.delete(`/faqs/${id}`);
  return res.data;
};


export const getFAQsBySlug = async (slug) => {
    const res = await axiosInstance.get(`/faq/slug/${slug}`);
    return res.data;
}