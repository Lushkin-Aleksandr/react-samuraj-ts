import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import defaultUserAvatar from '../../assets/images/avatar.png'
import axios from "axios";

class Users extends React.Component<UsersPropsType, any>{

  componentDidMount() {
    !this.props.users.length && axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
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