import React from 'react';
import './index.css';
import store, {StateType} from "./redux/state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";


const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={store.addPost.bind(store)}
                sendMessage={store.sendMessage.bind(store)}
                changeNewPostText={store.changeNewPostText.bind(store)}
                changeNewMessageText={store.changeNewMessageText.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree);

