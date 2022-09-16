import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {StateType} from "./redux/state";

type AppPropsType = {
    state: StateType
    addPost: () => void
    sendMessage: () => void
    changeNewPostText: (newPostText: string) => void
    changeNewMessageText: (newMessageText: string) => void
}

const App: React.FC<AppPropsType> = (props) => {
    return (
        <div className='container'>
            <div className="app">
                <Header/>
                <Navbar/>
                <div className="main">
                    <Route path={'/profile'}>
                        <Profile
                            addPost={props.addPost}
                            profilePage={props.state.profilePage}
                            changeNewPostText={props.changeNewPostText}/>
                    </Route>
                    <Route path={'/dialogs'}>
                        <Dialogs
                            sendMessage={props.sendMessage}
                            dialogsPage={props.state.dialogsPage}
                            changeNewMessageText={props.changeNewMessageText}/>
                    </Route>
                    <Route path={'/news'}>
                        <News/>
                    </Route>
                    <Route path={'/music'}>
                        <Music/>
                    </Route>
                    <Route path={'/settings'}>
                        <Settings/>
                    </Route>

                </div>
            </div>
        </div>
    );
}

export default App;
