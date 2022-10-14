import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import axios from "axios";
import {
  followAC,
  setCurrentPageAC,
  setIsFetchingAC,
  setTotalCountAC,
  setUsersAC,
  unfollowAC,
  UserType
} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
  users: UserType[]
  countOnPage: number
  currentPage: number
  totalCount: number
  isFetching: boolean
}
type MapDispatchToPropsType = {
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  setUsers: (users: UserType[]) => void
  setCurrentPage: (currentPage: number) => void
  setTotalCount: (totalCount: number) => void
  setIsFetching: (isFetching: boolean) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<UsersPropsType, any> {

  componentDidMount() {
    this.props.setIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users/?count=${this.props.countOnPage}&page=${this.props.currentPage}`).then(response => {
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
      this.props.setIsFetching(false)
    })
  }

  handlePageChange = (page: number) => {
    this.props.setIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users/?count=${this.props.countOnPage}&page=${page}`).then(response => {
      this.props.setUsers(response.data.items)
      this.props.setCurrentPage(page)
      this.props.setTotalCount(response.data.totalCount)
      this.props.setIsFetching(false)
    })
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
          handlePageChange={this.handlePageChange}/>
    )
  }
}


const mapStateToProps = (state: StateType): MapStateToPropsType => ({
  users: state.usersPage.users,
  countOnPage: state.usersPage.countOnPage,
  currentPage: state.usersPage.currentPage,
  totalCount: state.usersPage.totalCount,
  isFetching: state.usersPage.isFetching

})

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
  follow: userId => dispatch(followAC(userId)),
  unfollow: userId => dispatch(unfollowAC(userId)),
  setUsers: users => dispatch(setUsersAC(users)),
  setCurrentPage: currentPage => dispatch(setCurrentPageAC(currentPage)),
  setTotalCount: totalCount => dispatch(setTotalCountAC(totalCount)),
  setIsFetching: isFetching => dispatch(setIsFetchingAC(isFetching))
})


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)