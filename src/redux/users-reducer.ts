import {v1} from "uuid";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";


//------------------------------------------------
// Constants
//------------------------------------------------
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const SET_IS_FETCHING = 'SET-IS-FETCHING'
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS'

//------------------------------------------------
// Types
//------------------------------------------------


type PhotosType = {
    small: string | null,
    large: string | null
}
export type UserType = {
    id: number,
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
    isFetching: boolean,
    followingInProgress: number[]
}


type FollowActionType = ReturnType<typeof followSuccess>
type UnfollowActionType = ReturnType<typeof unfollowSuccess>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetTotalCountActionType = ReturnType<typeof setTotalCount>
type SetIsFetchingActionType = ReturnType<typeof setIsFetching>
type SetFollowingInProgressActionType = ReturnType<typeof setFollowingInProgress>
export type UsersActionType =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalCountActionType
    | SetIsFetchingActionType
    | SetFollowingInProgressActionType

//------------------------------------------------
// Initial state
//------------------------------------------------

const initialState: UsersStateType = {
    users: [],
    countOnPage: 5,
    currentPage: 1,
    totalCount: 0,
    isFetching: false,
    followingInProgress: []
}

//------------------------------------------------
// Reducer
//------------------------------------------------

const usersReducer = (state: UsersStateType = initialState, action : UsersActionType): UsersStateType => {
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
        case "SET_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(el => el !== action.payload.userId)
            }
        default:
            return state;
    }
}

//------------------------------------------------
// Action creators
//------------------------------------------------
export const followSuccess = (userId: number) => {
    return {
        type: FOLLOW,
        payload: {
            userId
        }
    } as const
}
export const unfollowSuccess = (userId: number) => {
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
export const setFollowingInProgress = (userId: number, isFetching: boolean) => {
    return {
        type: SET_FOLLOWING_IN_PROGRESS,
        payload: {
            userId,
            isFetching
        }
    } as const
}


// ThunkCreators

export const getUsers = (countOnPage: number, currentPage: number) => async (dispatch: Dispatch) => {
    dispatch(setIsFetching(true))
    // usersAPI.getUsers(countOnPage, currentPage)
    //     .then(data => {
    //         dispatch(setUsers(data.items))
    //         dispatch(setTotalCount(data.totalCount))
    //         dispatch(setIsFetching(false))
    //     })

    const data = await usersAPI.getUsers(countOnPage, currentPage);
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
    dispatch(setIsFetching(false))

}

export const follow = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(setFollowingInProgress(userId, true))
    usersAPI.follow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId))
            } else {
                console.error(data.messages[0])
            }
            dispatch(setFollowingInProgress(userId, false))
        })

}

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(setFollowingInProgress(userId, true))
    usersAPI.unfollow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            } else {
                console.error(data.messages[0])
            }
            dispatch(setFollowingInProgress(userId, false))
        })

}


export default usersReducer

