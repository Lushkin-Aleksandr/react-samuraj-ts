import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import defaultUserAvatar from '../../assets/images/avatar.png'
import axios from "axios";

class Users extends React.Component<UsersPropsType, any> {

  componentDidMount() {
    !this.props.users.length && axios.get(`https://social-network.samuraijs.com/api/1.0/users/?count=${this.props.countOnPage}&page=${this.props.currentPage}`).then(response => {
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
    })
  }

  handlePageChange(page: number) {

    axios.get(`https://social-network.samuraijs.com/api/1.0/users/?count=${this.props.countOnPage}&page=${page}`).then(response => {
      this.props.setUsers(response.data.items)
      this.props.setCurrentPage(page)
      this.props.setTotalCount(response.data.totalCount)
    })
  }

  render() {
    if (!this.props.users.length) return <h1>Loading...</h1>

    const pagesCount = Math.ceil(this.props.totalCount / this.props.countOnPage)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(<span
        style={{
          marginRight: '5px',
          cursor: 'pointer',
          color: i === this.props.currentPage ? '#ffd184' : 'inherit'
        }}
        onClick={() => this.handlePageChange(i)}>{i}</span>)
    }


    return (
      <div style={{padding: '10px'}}>
        <div style={{marginBottom: '10px', overflowX: 'scroll', width: '500px'}}>
          {pages}
        </div>
        <ul>
          {this.props.users.map(u => {
            return (
              <li key={u.id} style={{marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid white'}}>
                <img src={u.photos.small ? u.photos.small : defaultUserAvatar}
                     style={{width: '48px', height: '48px', borderRadius: '50%'}}/>
                <div>Name: {u.name}</div>
                {u.followed
                  ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                  : <button onClick={() => this.props.follow(u.id)}>Follow</button>}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Users;