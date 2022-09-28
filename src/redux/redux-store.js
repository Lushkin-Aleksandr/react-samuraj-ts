import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";



const store = createStore(combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
}))


export default store;