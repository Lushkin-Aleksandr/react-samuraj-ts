import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import {
    follow, getUsers,
    setCurrentPage, setFollowingInProgress,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";


type MapStateToPropsType = {
    users: UserType[]
    countOnPage: number
    currentPage: number
    totalCount: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UsersPropsType = MapStateToPropsType & {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    setFollowingInProgress: (userId: number, isFetching: boolean) => void
    getUsers: (countOnPage: number, currentPage: number) => void
}


class UsersContainer extends React.Component<UsersPropsType, any> {

    componentDidMount() {
        this.props.getUsers(this.props.countOnPage, this.props.currentPage)
    }

    handlePageChange = (page: number) => {
        this.props.getUsers(this.props.countOnPage, page)
        this.props.setCurrentPage(page)
    }

    render() {
        return (
            this.props.isFetching
                ? <h2>Loading...</h2>
                : <Users
                    users={this.props.users}
                    countOnPage={this.props.countOnPage}
                    currentPage={this.props.currentPage}
                    totalCount={this.props.totalCount}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    handlePageChange={this.handlePageChange}
                    followingInProgress={this.props.followingInProgress}
                    setFollowingInProgress={this.props.setFollowingInProgress}/>
        )
    }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    users: state.usersPage.users,
    countOnPage: state.usersPage.countOnPage,
    currentPage: state.usersPage.currentPage,
    totalCount: state.usersPage.totalCount,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
})


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    setFollowingInProgress,
    getUsers
})(UsersContainer)