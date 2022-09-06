import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import state, {addPost, sendMessage} from "./redux/state";

const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} sendMessage={sendMessage}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree()

