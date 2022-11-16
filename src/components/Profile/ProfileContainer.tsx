import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type ParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile: ProfileType
    status: string
    isAuth: boolean
    userId: string | null
}

export type ProfilePropsType = MapStateToPropsType & {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
} & RouteComponentProps<ParamsType>


class ProfileContainer extends Component<ProfilePropsType, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId && this.props.userId) {
            this.props.getProfile(+this.props.userId)
            this.props.getStatus(+this.props.userId)
        }

    }


    render() {
        if (!this.props.profile) return <h2>Loading...</h2>

        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}/>
        );
    }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    userId: state.auth.userId
})


export default compose<React.ComponentType>(
    // withAuthRedirect,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer);

