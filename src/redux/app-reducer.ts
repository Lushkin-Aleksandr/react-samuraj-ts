import {me} from "./auth-reducer";
import {AppThunkType} from "./redux-store";


//================== Constants ==================

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

//================== Types ==================

type InitialStateType = {
    initialized: boolean
}
export type AppActionType = ReturnType<typeof initializedSuccess>

//================== Initial state ==================

const initialState: InitialStateType = {
    initialized: false
}

//================== Reducer ==================

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS": {
            return {...state, initialized: true}
        }
        default:
            return state;
    }
}

//================== Action creators ==================

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS } as const)

//================== Thunk creators ==================
export const initializeApp = (): AppThunkType => (dispatch) => {
    const mePromise = dispatch(me())

    Promise.all([mePromise]).then(() => {
        dispatch(initializedSuccess())
    })
}
