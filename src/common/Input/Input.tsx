import React, {InputHTMLAttributes} from 'react';
import s from './Input.module.css'
import {WrappedFieldProps} from "redux-form";

type TextareaDefaultPropsType = InputHTMLAttributes<HTMLInputElement>

const Input = ({input, meta, className, ...props}: WrappedFieldProps & TextareaDefaultPropsType) => {
    const hasError = meta.error && meta.touched

    const errorClass = hasError ? s.error : ''
    const wrapperClass = `${s.inputWrapper} ${errorClass} ${className ? className : ''}`

    return (
        <div className={wrapperClass}>
            {hasError && <span className={s.errorSpan}>{meta.error}</span>}
            <input className={s.input} {...input} {...props}/>
        </div>
    );
};

export default Input;