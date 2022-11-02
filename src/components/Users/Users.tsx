import React from 'react';
import defaultUserAvatar from "../../assets/images/avatar.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";


type PropsType = {
    users: UserType[],
    countOnPage: number
    currentPage: number
    totalCount: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    handlePageChange: (currentPage: number) => void
    followingInProgress: number[]
    setFollowingInProgress: (userId: number, isFetching: boolean) => void
}

const Users: React.FC<PropsType> = (props) => {

    const pagesCount = Math.ceil(props.totalCount / props.countOnPage)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(<span
            key={i}
            style={{
                marginRight: '5px',
                cursor: 'pointer',
                color: i === props.currentPage ? '#ffd184' : 'inherit'
            }}
            onClick={() => props.handlePageChange(i)}>{i}</span>)
    }


    return (
        <div style={{padding: '10px'}}>
            <div style={{marginBottom: '10px', overflowX: 'scroll', height: '30px', width: '500px'}}>
                {pages}
            </div>
            <ul>
                {props.users.map(u => {
                    return (
                        <li key={u.id}
                            style={{marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid white'}}>
                            <NavLink to={`/profile/${u.id}`}>
                                <img
                                    src={u.photos.small ? u.photos.small : defaultUserAvatar}
                                    style={{width: '48px', height: '48px', borderRadius: '50%'}}
                                    alt={'avatar'}/>
                            </NavLink>
                            <div>Name: {u.name}</div>
                            {u.followed
                                ? <button
                                    disabled={props.followingInProgress.some(el => el === u.id)}
                                    onClick={() => props.unfollow(u.id)}>Unfollow</button>
                                : <button
                                    disabled={props.followingInProgress.some(el => el === u.id)}
                                    onClick={() => props.follow(u.id)}>Follow</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default Users;