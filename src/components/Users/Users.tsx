import React from 'react';
import defaultUserAvatar from "../../assets/images/avatar.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";


type PropsType = {
    users: UserType[],
    countOnPage: number
    currentPage: number
    totalCount: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    handlePageChange: (currentPage: number) => void
}

const Users:React.FC<PropsType> = (props) => {

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
                            <NavLink to={`/profile/${u.id}`}><img
                                src={u.photos.small ? u.photos.small : defaultUserAvatar}
                                style={{width: '48px', height: '48px', borderRadius: '50%'}}/></NavLink>
                            <div>Name: {u.name}</div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'bf0a45fd-7838-4bec-9b72-3f203f5ee23d'
                                        }
                                    })
                                        .then(res => {
                                            if (res.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            } else {
                                                console.warn(res.data.messages[0])
                                            }
                                        })

                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, null, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'bf0a45fd-7838-4bec-9b72-3f203f5ee23d'
                                        }
                                    })
                                        .then(res => {
                                            if (res.data.resultCode === 0) {
                                                props.follow(u.id)
                                            } else {
                                                console.warn(res.data.messages[0])
                                            }
                                        })


                                } }>Follow</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default Users;