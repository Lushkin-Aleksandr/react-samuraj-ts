import React, {ChangeEvent} from 'react';
import styles from '../../cssModules/Dialogs.module.css'
import DialogItem from "./DialogItem";
import {changeNewMessageTextAC, DialogsPageType, sendMessageAC} from "../../redux/dialogs-reducer";
import {StoreType} from "../../redux/redux-store";


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    sendMessage: () => void
    changeNewMessageText: (newMessageText: string) => void
}

type DialogsContainerPropsType = {
    store: StoreType
}



const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {


    const sendMessage = () => props.store.dispatch(sendMessageAC())

    const changeNewMessageText = (newMessageText: string) => props.store.dispatch(changeNewMessageTextAC(newMessageText));



    return (
        <Dialogs
            dialogsPage={props.store.getState().dialogsPage}
            sendMessage={sendMessage}
            changeNewMessageText={changeNewMessageText}/>
    );
};

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogItems: JSX.Element[] = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)
    const messageItems: JSX.Element[] = props.dialogsPage.messages.map(m => <div key={m.id} className={styles.messageItem}><span>{m.messageText}</span></div>)


    const sendMessage = () => props.sendMessage()

    const onChangeNewMessageText = (e: ChangeEvent<HTMLInputElement>) => props.changeNewMessageText(e.currentTarget.value)



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

export default DialogsContainer;