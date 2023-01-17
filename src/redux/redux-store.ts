import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionType} from "./profile-reducer";
import dialogsReducer, {DialogsActionType} from "./dialogs-reducer";
import usersReducer, {UsersActionType} from "./users-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {FormAction, reducer as formReducer} from "redux-form";
import {appReducer} from "./app-reducer";
import {composeWithDevTools} from "@redux-devtools/extension";

export type RootStateType = ReturnType<typeof rootReducer>
export type RootActionType = AuthActionType | DialogsActionType | ProfileActionType | UsersActionType | FormAction
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>



const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store;