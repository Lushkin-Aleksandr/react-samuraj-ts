import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {RootStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";


type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type PropsType = MapStateToPropsType & {
    logout: () => void
}


class HeaderContainer extends Component<PropsType, any> {


    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
                logout={this.props.logout}/>
        );
    }
}


const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {logout})(HeaderContainer);