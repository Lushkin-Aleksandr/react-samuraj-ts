import React from 'react';
import styles from '../../cssModules/Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem, {DialogItemPropsType} from "./DialogItem";


type DialogDataType = {
    id: number
    name: string
    lastMessage: string
}
const dialogsData: Array<DialogDataType> = [
    {id: 1, name: 'Petya', lastMessage: 'Hello!'},
    {id: 2, name: 'Vasya', lastMessage: 'How are you doing?'},
    {id: 3, name: 'Masha', lastMessage: 'React pizza'},
    {id: 4, name: 'Vitya', lastMessage: 'Study grids'},
    {id: 5, name: 'Eva', lastMessage: 'My name is Eva...'},
]

const Dialogs = () => {
    const dialogItems = dialogsData.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <ul>
                    {dialogItems}
                </ul>
            </div>
            <div className={styles.chatWindow}>
                <div className={styles.chatHistory}></div>
                <div className={styles.chatInputWrapper}>
                    <input className={styles.chatInput}/>
                    <button className={styles.sendMessageBtn}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;