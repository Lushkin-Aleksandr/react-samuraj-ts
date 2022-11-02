

//------------------------------------------------
// Constants
//------------------------------------------------

import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'


//------------------------------------------------
// Types
//------------------------------------------------
type AuthStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserDataType = ReturnType<typeof setUserData>
type ActionType = SetUserDataType




//------------------------------------------------
// Initial state
//------------------------------------------------

const initialState: AuthStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

//------------------------------------------------
// Reducer
//------------------------------------------------

const authReducer = (state: AuthStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.payload.data,
                isAuth: true
            }
        }
        default:
            return state;
    }
}

//------------------------------------------------
// Action creators
//------------------------------------------------

export type AuthDataType = {
    userId: string
    email: string
    login: string
}
export const setUserData = (data: AuthDataType) => {
    return {
        type: SET_USER_DATA,
        payload: {
            data
        }
    } as const
}

//------------------------------------------------
// Thunk creators
//------------------------------------------------

export const me = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(setUserData({userId: id, email, login}))
            }
        })
}




export default authReducer

