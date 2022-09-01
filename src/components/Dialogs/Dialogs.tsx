import React from 'react';
import styles from '../../cssModules/Dialogs.module.css'
import DialogItem from "./DialogItem";
import {DialogsPageType} from "../../redux/state";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogItems: JSX.Element[] = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)

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