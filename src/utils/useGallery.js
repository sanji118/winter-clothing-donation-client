import axiosInstance from "../hook/axiosInstance"

export const getPhotos = async () =>{
    const result = await axiosInstance.get('/gallery');
    return result.data;
}