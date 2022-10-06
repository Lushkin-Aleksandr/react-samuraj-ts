import {v1} from "uuid";


//------------------------------------------------
// Constants
//------------------------------------------------
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

//------------------------------------------------
// Types
//------------------------------------------------


type LocationType = {
    city: string
    country: string
}
export type UserType = {
    id: string,
    avatarUrl: string
    followed: boolean,
    fullName: string
    status: string
    location: LocationType
}
export type UsersStateType = {
    users: UserType[]
}


type FollowActionType = ReturnType<typeof followAC>
type UnfollowActionType = ReturnType<typeof unfollowAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
type ActionTypes = FollowActionType | UnfollowActionType | SetUsersActionType

//------------------------------------------------
// Initial state
//------------------------------------------------

const initialState: UsersStateType = {
    users: []
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
            return {...state, users: [...state.users, ...action.payload.users]}
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


export default usersReducer

