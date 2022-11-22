import React, {ChangeEvent} from 'react';
import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Textarea from "../../common/Textarea/Textarea";
import {maxLengthCreator, requiredField} from "../../utils/validators";


const maxLength50 = maxLengthCreator(50)

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const dialogItems: JSX.Element[] = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage} />)
    const messageItems: JSX.Element[] = props.messages.map(m => <div key={m.id} className={styles.messageItem}><span>{m.messageText}</span></div>)


    const sendMessage = (data: FormDataType) => {
        props.sendMessage(data.messageText)
        console.log(data)
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
                <AddMessageFormWithRedux onSubmit={sendMessage}/>
            </div>
        </div>
    );
};


type FormDataType = {
    messageText: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <Field
                name={'messageText'}
                component={Textarea}
                validate={[requiredField, maxLength50]}
                className={styles.chatTextarea}/>
            <button className={styles.sendMessageBtn}>Send</button>
        </form>
    )
}

const AddMessageFormWithRedux = reduxForm<FormDataType>({form: 'message'})(AddMessageForm)






export default Dialogs;