import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import defaultUserAvatar from '../../assets/avatar.png'
import {v1} from "uuid";

const Users:React.FC<UsersPropsType> = (props) => {
    !props.users.length && props.setUsers([
        {
            id: v1(),
            avatarUrl: '',
            followed: false,
            fullName: 'Vasya',
            status: 'I am a developer',
            location: {
                city: 'Moscow',
                country: 'Russia'
            }
        },
        {
            id: v1(),
            avatarUrl: '',
            followed: true,
            fullName: 'Petya',
            status: 'I am a chef',
            location: {
                city: 'Munich',
                country: 'Germany'
            }
        },
        {
            id: v1(),
            avatarUrl: '',
            followed: false,
            fullName: 'Kolya',
            status: 'I am a lawyer',
            location: {
                city: 'Rome',
                country: 'Italy'
            }
        },
    ])

    return (
        <div style={{padding: '10px'}}>
            <ul>
                {props.users.map(u => {
                    return (
                        <li key={u.id} style={{marginBottom: '10px', paddingBottom: '10px' , borderBottom: '1px solid white'}}>
                            <img src={u.avatarUrl ? u.avatarUrl : defaultUserAvatar} style={{width: '48px', height: '48px', borderRadius: '50%'}}/>
                            <div>Name: {u.fullName}</div>
                            <div>Country: {u.location.country}</div>
                            <div>City: {u.location.city}</div>
                            {u.followed
                                ? <button onClick={() => props.unfollow(u.id)} >Unfollow</button>
                                : <button onClick={() => props.follow(u.id)} >Follow</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Users;