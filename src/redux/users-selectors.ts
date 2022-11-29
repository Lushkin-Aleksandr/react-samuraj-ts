import {RootStateType} from "./redux-store";


export const getUsersSelector = (state: RootStateType) => {
    return state.usersPage.users
}

export const getCountOnPageSelector = (state: RootStateType) => {
    return state.usersPage.countOnPage
}

export const getCurrentPageSelector = (state: RootStateType) => {
    return state.usersPage.currentPage
}

export const getTotalCountSelector = (state: RootStateType) => {
    return state.usersPage.totalCount
}

export const getIsFetchingSelector = (state: RootStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressSelector = (state: RootStateType) => {
    return state.usersPage.followingInProgress
}

