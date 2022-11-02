import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";


type ParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
}

export type ProfilePropsType = MapStateToPropsType & {
    getProfile: (userId: number) => void
} & RouteComponentProps<ParamsType>


class ProfileContainer extends Component<ProfilePropsType, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId || '11385'
        this.props.getProfile(+userId)
    }


    render() {
        if (!this.props.isAuth) return <Redirect to={'login'}/>
        if (!this.props.profile) return <h2>Loading...</h2>

        return (
            <Profile profile={this.props.profile}/>
        );
    }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

const ProfileContainerWithUrlData = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getProfile})(ProfileContainerWithUrlData);