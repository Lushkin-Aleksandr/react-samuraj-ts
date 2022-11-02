import React, {ChangeEvent} from 'react';
import styles from '../../cssModules/Dialogs.module.css'
import DialogItem from "./DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogItems: JSX.Element[] = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)
    const messageItems: JSX.Element[] = props.messages.map(m => <div key={m.id} className={styles.messageItem}><span>{m.messageText}</span></div>)


    const sendMessage = () => {
        props.sendMessage()
        props.changeNewMessageText('')
    }

    const onChangeNewMessageText = (e: ChangeEvent<HTMLInputElement>) => props.changeNewMessageText(e.currentTarget.value)


    if (!props.isAuth) return <Redirect to={'login'}/>

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
                        value={props.newMessageText}
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