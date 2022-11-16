import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionType} from "./profile-reducer";
import dialogsReducer, {DialogsActionType} from "./dialogs-reducer";
import usersReducer, {UsersActionType} from "./users-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {FormAction, reducer as formReducer} from "redux-form";

export type StateType = ReturnType<typeof rootReducer>
export type AppActionType = AuthActionType | DialogsActionType | ProfileActionType | UsersActionType | FormAction
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, AppActionType>


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))


export default store;