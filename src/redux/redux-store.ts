import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

export type StoreType = typeof store;

const store = createStore(combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
}))


export default store;