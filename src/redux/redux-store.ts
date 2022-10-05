import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

export type StateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

const store = createStore(rootReducer)



export default store;