import axios from "axios";


type UserAPIType = {
    getUsers: (countOnPage: number, currentPage: number) => Promise<any>
    follow: (userId: number) => Promise<any>
    unfollow: (userId: number) => Promise<any>
}
type AuthAPIType = {
    me: () => Promise<any>
}
type ProfileAPIType = {
    getProfile: (userId: number) => Promise<any>
    getStatus: (userId: number) => Promise<any>
    updateStatus: (status: string) => Promise<any>
}


const axiosInstance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'bf0a45fd-7838-4bec-9b72-3f203f5ee23d'
    }
})


export const usersAPI: UserAPIType = {
    getUsers: (countOnPage, currentPage) => {
        return axiosInstance.get(`users/?count=${countOnPage}&page=${currentPage}`)
            .then(res => res.data)
    },
    follow: userId => {
        return axiosInstance.post(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollow: userId => {
        return axiosInstance.delete(`follow/${userId}`)
            .then(res => res.data)
    }
}

export const authAPI: AuthAPIType = {
    me: () => {
        return axiosInstance.get(`auth/me`).then(res => res.data)
    }
}

export const profileAPI: ProfileAPIType = {
    getProfile: userId => {
        return axiosInstance.get(`profile/${userId}`).then(res => res.data)
    },
    getStatus: userId => {
        return axiosInstance.get(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus: (status) => {
        return axiosInstance.put(`profile/status`, {status}).then(res => res.data)
    }
}

