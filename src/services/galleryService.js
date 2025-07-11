import axiosInstance from "../hooks/axiosInstance"

export const getPhotos = async () =>{
    const result = await axiosInstance.get('/gallery');
    return result.data;
}

export const getGalleryBySlug = async (slug) => {
    const res = await axiosInstance.get(`/gallery/slug/${slug}`);
    return res.data;
}