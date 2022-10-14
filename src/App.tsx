import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

type AppPropsType = {
}



const App: React.FC<AppPropsType> = (props) => {
    return (
        <div className='container'>
            <div className="app">
                <Header/>
                <Navbar/>
                <div className="main">
                    <Route path={'/profile/:userId?'}>
                        <ProfileContainer/>
                    </Route>
                    <Route path={'/dialogs'}>
                        <DialogsContainer/>
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
                    <Route path={'/users'}>
                        <UsersContainer/>
                    </Route>

                </div>
            </div>
        </div>
    );
}

export default App;
