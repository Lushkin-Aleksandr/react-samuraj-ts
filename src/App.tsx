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
import {ActionTypes, StateType} from "./redux/state";

type AppPropsType = {
    state: StateType
    dispatch: (action: ActionTypes) => void
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
                            profilePage={props.state.profilePage}
                            dispatch={props.dispatch}/>
                    </Route>
                    <Route path={'/dialogs'}>
                        <Dialogs
                            dialogsPage={props.state.dialogsPage}
                            dispatch={props.dispatch}/>
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
