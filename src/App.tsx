import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {RootStateType} from "./redux/redux-store";
import {compose} from "redux";

type MstpType = {
    initialized: boolean
}
type AppPropsType = MstpType & {
    initializeApp: () => void
}


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return (
                <div style={{
                    width: '100vw',
                    height: '100vw',
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <h1>Loading...</h1>
                </div>
            )
        }

        return (
            <div className='container'>
                <div className="app">
                    <HeaderContainer/>
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
                        <Route path={'/login'}>
                            <Login/>
                        </Route>
                    </div>
                </div>
            </div>
        );
    }
}


const mstp = (state: RootStateType): MstpType => ({
    initialized: state.app.initialized
})


export default compose<React.ComponentType>(
    withRouter,
    connect(mstp, {initializeApp}))(App);
