import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {StateType} from "../../redux/redux-store";
import {logout, me} from "../../redux/auth-reducer";


type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type PropsType = MapStateToPropsType & {
    me: () => void
    logout: () => void
}


class HeaderContainer extends Component<PropsType, any> {

    componentDidMount() {
        this.props.me()
    }

    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
                logout={this.props.logout}/>
        );
    }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {me, logout})(HeaderContainer);