import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {StateType} from "../../redux/redux-store";
import {AuthDataType, me, setUserData} from "../../redux/auth-reducer";
import axios from "axios";
import {authAPI} from "../../api/api";


type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type PropsType = MapStateToPropsType & {
    me: () => void
}


class HeaderContainer extends Component<PropsType, any> {

    componentDidMount() {
        this.props.me()
    }

    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}/>
        );
    }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {me})(HeaderContainer);