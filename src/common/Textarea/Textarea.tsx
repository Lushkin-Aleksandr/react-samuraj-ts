import React, {TextareaHTMLAttributes} from 'react';
import s from './Textarea.module.css'
import {WrappedFieldProps} from "redux-form";

type TextareaDefaultPropsType = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({input, meta, className, ...props}: WrappedFieldProps & TextareaDefaultPropsType) => {
    const hasError = meta.error && meta.touched

    const errorClass = hasError ? s.error : ''
    const wrapperClass = `${s.textareaWrapper} ${errorClass} ${className ? className : ''}`

    return (
        <div className={wrapperClass}>
            {hasError && <span className={s.errorSpan}>{meta.error}</span>}
            <textarea className={s.textarea} {...input} {...props}/>
        </div>
    );
};

export default Textarea;