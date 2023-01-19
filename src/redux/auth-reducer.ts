import { authAPI, LoginDataType, securityAPI } from '../api/api'
import { AppThunkType } from './redux-store'
import { stopSubmit } from 'redux-form'

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
  captcha: string | null
}

type SetUserDataType = ReturnType<typeof setUserData>
type SetCaptchaDataType = ReturnType<typeof setCaptcha>
export type AuthActionType = SetUserDataType | SetCaptchaDataType

//------------------------------------------------
// Initial state
//------------------------------------------------

const initialState: AuthStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captcha: null,
}

//------------------------------------------------
// Reducer
//------------------------------------------------

const authReducer = (state: AuthStateType = initialState, action: AuthActionType) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        ...action.payload.data,
      }
    }
    case 'SET-CAPTCHA': {
      return {
        ...state,
        captcha: action.payload,
      }
    }
    default:
      return state
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
      data,
    },
  } as const
}
export const setCaptcha = (url: string) => {
  return {
    type: 'SET-CAPTCHA',
    payload: url,
  } as const
}

//------------------------------------------------
// Thunk creators
//------------------------------------------------

export const me = (): AppThunkType => dispatch => {
  return authAPI.me().then(data => {
    if (data.resultCode === 0) {
      const { id, email, login } = data.data
      dispatch(setUserData({ userId: id, email, login, isAuth: true }))
    }
  })
}

export const login =
  (loginData: LoginDataType): AppThunkType =>
  dispatch => {
    authAPI.login(loginData).then(data => {
      if (data.resultCode === 0) {
        dispatch(me())
      } else {
        if (data.resultCode === 10) {
          dispatch(getCaptcha())
        }
        const action = stopSubmit('login', { _error: data.messages[0] })
        dispatch(action)
      }
    })
  }

export const logout = (): AppThunkType => dispatch => {
  authAPI.logout().then(data => {
    if (data.resultCode === 0) {
      dispatch(setUserData({ userId: null, login: null, email: null, isAuth: false }))
    } else {
      alert(data.messages[0])
    }
  })
}

export const getCaptcha = (): AppThunkType => dispatch => {
  securityAPI.getCaptchaUrl().then(data => {
    dispatch(setCaptcha(data.url))
  })
}

export default authReducer
