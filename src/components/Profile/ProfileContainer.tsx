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
    profile: ProfileType,
    status: string
}

export type ProfilePropsType = MapStateToPropsType & {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
} & RouteComponentProps<ParamsType>


class ProfileContainer extends Component<ProfilePropsType, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId || '11385'
        this.props.getProfile(+userId)
        this.props.getStatus(+userId)
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
    status: state.profilePage.status
})


export default compose<React.ComponentType>(
    // withAuthRedirect,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer);

