import React, {createRef, RefObject} from 'react';
import styles from '../../cssModules/Dialogs.module.css'
import DialogItem from "./DialogItem";
import {DialogsPageType} from "../../redux/state";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogItems: JSX.Element[] = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)
    const messageItems: JSX.Element[] = props.dialogsPage.messages.map(m => <div key={m.id} className={styles.messageItem}><span>{m.messageText}</span></div>)
    const inputRef: RefObject<HTMLInputElement> = createRef();

    const sendMessage = () => {
        const text = inputRef.current?.value;
        if (text) {
            props.sendMessage(text);
        }
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
                    <input ref={inputRef} className={styles.chatInput}/>
                    <button
                        className={styles.sendMessageBtn}
                        onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;