import {API_URL} from "../../env";
import {TNewsCreateBody, TNewsDataResponse} from "./newsTypes";
import apiClient from "../apiClient";

const newsService = {
    getNews: async (pageNum = 1, pageSize = 100) => {
        return await apiClient.get<TNewsDataResponse>(`${API_URL}/admin/news?pagenum=${pageNum}&pagesize=${pageSize}`)
    },

    createNews: async (newsId = '', newsData: TNewsCreateBody) => {
        return await apiClient.post<TNewsDataResponse>(`${API_URL}/admin/news`, newsData)
    },

    updateNews: async (newsId: number, newsData: TNewsCreateBody) => {
        return await apiClient.put<TNewsDataResponse>(`${API_URL}/admin/news/${newsId}`, newsData)
    },

    deleteNews: async (newsId: number) => {
        return await apiClient.delete<TNewsDataResponse>(`${API_URL}/admin/news/${newsId}`)
    }
}

export default newsService