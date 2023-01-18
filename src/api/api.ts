import axios from 'axios'
import { PhotosType } from '../redux/profile-reducer'

export type LoginDataType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

const axiosInstance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    'API-KEY': 'bf0a45fd-7838-4bec-9b72-3f203f5ee23d',
  },
})

export const usersAPI = {
  getUsers: (countOnPage: number, currentPage: number) => {
    return axiosInstance.get(`users/?count=${countOnPage}&page=${currentPage}`).then(res => res.data)
  },
  follow: (userId: number) => {
    return axiosInstance.post(`follow/${userId}`).then(res => res.data)
  },
  unfollow: (userId: number) => {
    return axiosInstance.delete(`follow/${userId}`).then(res => res.data)
  },
}

export const authAPI = {
  me: () => {
    return axiosInstance.get(`auth/me`).then(res => res.data)
  },
  login: (loginData: LoginDataType) => {
    return axiosInstance.post<ResponseType<{ userId?: string }>>(`auth/login`, { ...loginData }).then(res => res.data)
  },
  logout: () => {
    return axiosInstance.delete<ResponseType>(`auth/login`).then(res => res.data)
  },
}

export const profileAPI = {
  getProfile: (userId: number) => {
    return axiosInstance.get(`profile/${userId}`).then(res => res.data)
  },
  getStatus: (userId: number) => {
    return axiosInstance.get(`profile/status/${userId}`).then(res => res.data)
  },
  updateStatus: (status: string) => {
    return axiosInstance.put(`profile/status`, { status }).then(res => res.data)
  },
  uploadPhoto(avatar: File) {
    let formData = new FormData()
    formData.append('image', avatar)
    return axiosInstance
      .put<{ data: { photos: PhotosType }; resultCode: number; messages: string[] }>('profile/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => res.data)
  },
}
