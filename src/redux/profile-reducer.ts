import {v1} from "uuid";
import {compose, Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';
const SET_PROFILE = 'SET-PROFILE';

type AddPostActionType = ReturnType<typeof addPostAC>
type changeNewPostTextActionType = ReturnType<typeof changeNewPostTextAC>
type setProfileActionType = ReturnType<typeof setProfile>
export type ProfileActionTypes = AddPostActionType | changeNewPostTextActionType | setProfileActionType


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
}

const initialState: ProfilePageType = {
  profile: null,
  posts: [
    {id: v1(), postText: 'Hi, how are you?', likesCount: 5},
    {id: v1(), postText: `It's my first post.`, likesCount: 10},
  ],
  newPostText: ''
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


export const getProfile = (userId: number) => (dispatch: Dispatch) => {
  profileAPI.getProfile(userId)
      .then(data => {
        dispatch(setProfile(data))
      })
}


export default profileReducer;