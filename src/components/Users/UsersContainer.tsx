import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";
import Users from "./Users";


type MapStateToPropsType = {
  users: UserType[],
  countOnPage: number,
  currentPage: number,
  totalCount: number
}
type MapDispatchToPropsType = {
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: UserType[]) => void
  setCurrentPage: (currentPage: number) => void
  setTotalCount: (totalCount: number) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
  users: state.usersPage.users,
  countOnPage: state.usersPage.countOnPage,
  currentPage: state.usersPage.currentPage,
  totalCount: state.usersPage.totalCount,
})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
  follow: userId => dispatch(followAC(userId)),
  unfollow: userId => dispatch(unfollowAC(userId)),
  setUsers: users => dispatch(setUsersAC(users)),
  setCurrentPage: currentPage => dispatch(setCurrentPageAC(currentPage)),
  setTotalCount: totalCount => dispatch(setTotalCountAC(totalCount))
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)