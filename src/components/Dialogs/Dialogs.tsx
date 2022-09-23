import React, {ChangeEvent, createRef, RefObject} from 'react';
import styles from '../../cssModules/Dialogs.module.css'
import DialogItem from "./DialogItem";
import {ActionType, DialogsPageType} from "../../redux/state";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionType) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogItems: JSX.Element[] = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)
    const messageItems: JSX.Element[] = props.dialogsPage.messages.map(m => <div key={m.id} className={styles.messageItem}><span>{m.messageText}</span></div>)


    const sendMessage = () => {
        props.dispatch({
            type: 'SEND-MESSAGE'
        })
    }

    const onChangeNewMessageText = (e: ChangeEvent<HTMLInputElement>) => {
        props.dispatch({
            type: 'CHANGE-NEW-MESSAGE-TEXT',
            payload: e.currentTarget.value
        })
    }



    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <ul>
                    {dialogItems}
                </ul>
            </div>
            <div className={styles.chatWindow}>
                <div className={styles.chatHistory}>
                    {messageItems}
                </div>
                <div className={styles.chatInputWrapper}>
                    <input
                        className={styles.chatInput}
                        value={props.dialogsPage.newMessageText}
                        onChange={onChangeNewMessageText}/>
                    <button
                        className={styles.sendMessageBtn}
                        onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;