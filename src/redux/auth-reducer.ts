import {authAPI, LoginDataType} from "../api/api";
import {AppThunkType} from "./redux-store";


//------------------------------------------------
// Constants
//------------------------------------------------


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
export type AuthActionType = SetUserDataType




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

const authReducer = (state: AuthStateType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.payload.data,
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
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
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

export const me = (): AppThunkType => (dispatch) => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(setUserData({userId: id, email, login, isAuth: true}))
            }
        })
}


export const login = (loginData: LoginDataType): AppThunkType => (dispatch) => {
    authAPI.login(loginData)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(me())
            } else {
                alert(data.messages[0])
            }
        })
}

export const logout = (): AppThunkType => (dispatch) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData({userId: null, login: null, email: null, isAuth: false}))
            } else {
                alert(data.messages[0])
            }
        })
}




export default authReducer

