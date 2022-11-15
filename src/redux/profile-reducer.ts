import {v1} from "uuid";
import {compose, Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET-PROFILE';
const SET_STATUS = 'SET_STATUS';

type AddPostActionType = ReturnType<typeof addPostAC>
type setProfileActionType = ReturnType<typeof setProfile>
type SetStatusActionType = ReturnType<typeof setStatus>
export type ProfileActionTypes =
    AddPostActionType
    | setProfileActionType
    | SetStatusActionType


export type PostType = {
    id: string
    postText: string
    likesCount: number
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = null | {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: any
    photos: PhotosType
}
export type ProfilePageType = {
    profile: ProfileType
    posts: PostType[]
    status: string
}

const initialState: ProfilePageType = {
    profile: null,
    posts: [
        {id: v1(), postText: 'Hi, how are you?', likesCount: 5},
        {id: v1(), postText: `It's my first post.`, likesCount: 10},
    ],
    status: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostType = {
                id: v1(),
                postText: action.payload.postText,
                likesCount: 0
            }

            return {
                ...state,
                posts: [
                    newPost,
                    ...state.posts
                ]
            }

        case "SET-PROFILE":
            return {
                ...state,
                profile: action.payload.profile
            }
        case "SET_STATUS": {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state;
    }
}


export const addPostAC = (postText: string) => ({type: ADD_POST, payload: {postText}} as const)
export const setProfile = (profile: ProfileType) => {
    return {
        type: SET_PROFILE,
        payload: {
            profile
        }
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        payload: {
            status
        }
    } as const
}


export const getProfile = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setProfile(data))
        })
}

export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            } else {
                console.log(`Some error: ${data}`)
            }
        })
}


export default profileReducer;