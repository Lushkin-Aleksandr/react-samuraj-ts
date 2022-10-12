import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";
import Users from "./Users";




type MapStateToPropsType = {
    users: UserType[]
}
type MapDispatchToPropsType = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UserType[]) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    users: state.usersPage.users
})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
    follow: userId => dispatch(followAC(userId)),
    unfollow: userId => dispatch(unfollowAC(userId)),
    setUsers: users => dispatch(setUsersAC(users))
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)