import React from 'react';
import './index.css';
import state, {
    addPost,
    changeNewMessageText,
    changeNewPostText,
    sendMessage,
    StateType,
    subscribe
} from "./redux/state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";


const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={addPost}
                sendMessage={sendMessage}
                changeNewPostText={changeNewPostText}
                changeNewMessageText={changeNewMessageText}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(state)

subscribe(rerenderEntireTree);

