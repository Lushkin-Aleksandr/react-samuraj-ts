import React from 'react'
import defaultUserAvatar from '../../assets/images/avatar.png'
import { UserType } from '../../redux/users-reducer'
import { NavLink } from 'react-router-dom'
import { Paginator } from '../../common/Paginator/Paginator'

type PropsType = {
  users: UserType[]
  countOnPage: number
  currentPage: number
  totalCount: number
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  handlePageChange: (currentPage: number) => void
  followingInProgress: number[]
  setFollowingInProgress: (userId: number, isFetching: boolean) => void
}

const Users: React.FC<PropsType> = props => {
  return (
    <div style={{ padding: '10px' }}>
      <Paginator
        totalItemsCount={props.totalCount}
        pageSize={props.countOnPage}
        currentPage={props.currentPage}
        onPageChange={props.handlePageChange}
      />
      <ul>
        {props.users.map(u => {
          return (
            <li key={u.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid white' }}>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  src={u.photos.small ? u.photos.small : defaultUserAvatar}
                  style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                  alt={'avatar'}
                />
              </NavLink>
              <div>Name: {u.name}</div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some(el => el === u.id)}
                  onClick={() => props.unfollow(u.id)}>
                  Unfollow
                </button>
              ) : (
                <button disabled={props.followingInProgress.some(el => el === u.id)} onClick={() => props.follow(u.id)}>
                  Follow
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Users
