import {v1} from "uuid";
import {compose, Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';
const SET_PROFILE = 'SET-PROFILE';
const SET_STATUS = 'SET_STATUS';

type AddPostActionType = ReturnType<typeof addPostAC>
type changeNewPostTextActionType = ReturnType<typeof changeNewPostTextAC>
type setProfileActionType = ReturnType<typeof setProfile>
type SetStatusActionType = ReturnType<typeof setStatus>
export type ProfileActionTypes =
    AddPostActionType
    | changeNewPostTextActionType
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
    newPostText: string
    status: string
}

const initialState: ProfilePageType = {
    profile: null,
    posts: [
        {id: v1(), postText: 'Hi, how are you?', likesCount: 5},
        {id: v1(), postText: `It's my first post.`, likesCount: 10},
    ],
    newPostText: '',
    status: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionTypes): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostType = {
                id: v1(),
                postText: state.newPostText,
                likesCount: 0
            }

            return {
                ...state,
                posts: [
                    newPost,
                    ...state.posts
                ]
            }

        case 'CHANGE-NEW-POST-TEXT':
            state.newPostText = action.payload
            return {...state, newPostText: action.payload};
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


export const addPostAC = () => ({type: ADD_POST} as const)
export const changeNewPostTextAC = (newPostText: string) => ({
    type: CHANGE_NEW_POST_TEXT,
    payload: newPostText
} as const)
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