import axiosInstance from "../hooks/axiosInstance";

export const getPhotos = async () => {
  const res = await axiosInstance.get("/gallery");
  return res.data;
};

export const getGalleryItemById = async (id) => {
  const res = await axiosInstance.get(`/gallery/${id}`);
  return res.data;
};

export const createGalleryItem = async (data) => {
  const res = await axiosInstance.post("/gallery", data);
  return res.data;
};

export const updateGalleryItem = async (id, data) => {
  const res = await axiosInstance.patch(`/gallery/${id}`, data);
  return res.data;
};

export const deleteGalleryItem = async (id) => {
  const res = await axiosInstance.delete(`/gallery/${id}`);
  return res.data;
};


export const getGalleryBySlug = async (slug) => {
    const res = await axiosInstance.get(`/gallery/slug/${slug}`);
    return res.data;
}