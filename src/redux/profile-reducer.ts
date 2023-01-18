import { v1 } from 'uuid'
import { profileAPI } from '../api/api'
import { AppThunkType } from './redux-store'

const ADD_POST = 'ADD-POST'
const REMOVE_POST = 'REMOVE-POST'
const SET_PROFILE = 'SET-PROFILE'
const SET_STATUS = 'SET_STATUS'

type AddPostActionType = ReturnType<typeof addPostAC>
type RemovePostActionType = ReturnType<typeof removePostAC>
type setProfileActionType = ReturnType<typeof setProfile>
type SetStatusActionType = ReturnType<typeof setStatus>
type SetPhotosActionType = ReturnType<typeof setPhotos>
export type ProfileActionType =
  | AddPostActionType
  | setProfileActionType
  | SetStatusActionType
  | RemovePostActionType
  | SetPhotosActionType

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
    { id: v1(), postText: 'Hi, how are you?', likesCount: 5 },
    { id: v1(), postText: `It's my first post.`, likesCount: 10 },
  ],
  status: '',
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
  switch (action.type) {
    case 'ADD-POST':
      const newPost: PostType = {
        id: v1(),
        postText: action.payload.postText,
        likesCount: 0,
      }

      return {
        ...state,
        posts: [newPost, ...state.posts],
      }
    case 'REMOVE-POST': {
      return { ...state, posts: state.posts.filter(p => p.id !== action.payload.postId) }
    }

    case 'SET-PROFILE':
      return {
        ...state,
        profile: action.payload.profile,
      }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.payload.status,
      }
    }
    case 'SET-PHOTOS': {
      if (!state.profile) return state

      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.payload,
        },
      }
    }
    default:
      return state
  }
}

export const addPostAC = (postText: string) => ({ type: ADD_POST, payload: { postText } } as const)
export const removePostAC = (postId: string) => ({ type: REMOVE_POST, payload: { postId } } as const)
export const setProfile = (profile: ProfileType) => {
  return {
    type: SET_PROFILE,
    payload: {
      profile,
    },
  } as const
}
export const setStatus = (status: string) => {
  return {
    type: SET_STATUS,
    payload: {
      status,
    },
  } as const
}
export const setPhotos = (photos: PhotosType) => ({ type: 'SET-PHOTOS', payload: photos } as const)

export const getProfile =
  (userId: number): AppThunkType =>
  dispatch => {
    profileAPI.getProfile(userId).then(data => {
      dispatch(setProfile(data))
    })
  }

export const getStatus =
  (userId: number): AppThunkType =>
  dispatch => {
    profileAPI.getStatus(userId).then(data => {
      dispatch(setStatus(data))
    })
  }

export const updateStatus =
  (status: string): AppThunkType =>
  dispatch => {
    profileAPI.updateStatus(status).then(data => {
      if (data.resultCode === 0) {
        dispatch(setStatus(status))
      } else {
        console.log(`Some error: ${data}`)
      }
    })
  }

export const uploadAvatar =
  (avatar: File): AppThunkType =>
  async dispatch => {
    const data = await profileAPI.uploadPhoto(avatar)
    if (data.resultCode === 0) {
      dispatch(setPhotos(data.data.photos))
    } else {
    }
  }

export default profileReducer
