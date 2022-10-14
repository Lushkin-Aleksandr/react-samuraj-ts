import {v1} from "uuid";


//------------------------------------------------
// Constants
//------------------------------------------------
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'

//------------------------------------------------
// Types
//------------------------------------------------


type PhotosType = {
  small: string | null,
  large: string | null
}
export type UserType = {
  id: string,
  photos: PhotosType
  followed: boolean,
  name: string
  status: string
}
export type UsersStateType = {
  users: UserType[],
  countOnPage: number,
  currentPage: number,
  totalCount: number
}


type FollowActionType = ReturnType<typeof followAC>
type UnfollowActionType = ReturnType<typeof unfollowAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
type SetTotalCountActionType = ReturnType<typeof setTotalCountAC>
type ActionTypes =
  FollowActionType
  | UnfollowActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalCountActionType

//------------------------------------------------
// Initial state
//------------------------------------------------

const initialState: UsersStateType = {
  users: [],
  countOnPage: 5,
  currentPage: 1,
  totalCount: 0
}

//------------------------------------------------
// Reducer
//------------------------------------------------

const usersReducer = (state: UsersStateType = initialState, action: ActionTypes): UsersStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)}
    case "UNFOLLOW":
      return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
    case "SET-USERS":
      return {...state, users: [...action.payload.users]}
    case "SET-CURRENT-PAGE":
      return {...state, currentPage: action.payload.currentPage}
    case "SET-TOTAL-COUNT":
      return {...state, totalCount: action.payload.totalCount}
    default:
      return state;
  }
}

//------------------------------------------------
// Action creators
//------------------------------------------------
export const followAC = (userId: string) => {
  return {
    type: FOLLOW,
    payload: {
      userId
    }
  } as const
}
export const unfollowAC = (userId: string) => {
  return {
    type: UNFOLLOW,
    payload: {
      userId
    }
  } as const
}
export const setUsersAC = (users: UserType[]) => {
  return {
    type: SET_USERS,
    payload: {
      users
    }
  } as const
}
export const setCurrentPageAC = (currentPage: number) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: {
      currentPage
    }
  } as const
}
export const setTotalCountAC = (totalCount: number) => {
  return {
    type: SET_TOTAL_COUNT,
    payload: {
      totalCount
    }
  } as const
}


export default usersReducer

