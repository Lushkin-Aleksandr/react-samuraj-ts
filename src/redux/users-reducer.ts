import {v1} from "uuid";


//------------------------------------------------
// Constants
//------------------------------------------------
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const SET_IS_FETCHING = 'SET-IS-FETCHING'

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
  totalCount: number,
  isFetching: boolean
}


type FollowActionType = ReturnType<typeof follow>
type UnfollowActionType = ReturnType<typeof unfollow>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetTotalCountActionType = ReturnType<typeof setTotalCount>
type SetIsFetchingActionType = ReturnType<typeof setIsFetching>
type ActionTypes =
  FollowActionType
  | UnfollowActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalCountActionType
  | SetIsFetchingActionType

//------------------------------------------------
// Initial state
//------------------------------------------------

const initialState: UsersStateType = {
  users: [],
  countOnPage: 5,
  currentPage: 1,
  totalCount: 0,
  isFetching: false
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
    case "SET-IS-FETCHING":
      return {...state, isFetching: action.payload.isFetching}
    default:
      return state;
  }
}

//------------------------------------------------
// Action creators
//------------------------------------------------
export const follow = (userId: string) => {
  return {
    type: FOLLOW,
    payload: {
      userId
    }
  } as const
}
export const unfollow = (userId: string) => {
  return {
    type: UNFOLLOW,
    payload: {
      userId
    }
  } as const
}
export const setUsers = (users: UserType[]) => {
  return {
    type: SET_USERS,
    payload: {
      users
    }
  } as const
}
export const setCurrentPage = (currentPage: number) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: {
      currentPage
    }
  } as const
}
export const setTotalCount = (totalCount: number) => {
  return {
    type: SET_TOTAL_COUNT,
    payload: {
      totalCount
    }
  } as const
}
export const setIsFetching = (isFetching: boolean) => {
  return {
    type: SET_IS_FETCHING,
    payload: {
      isFetching
    }
  } as const
}


export default usersReducer

