import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Input from "../../common/Input/Input";
import {requiredField} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {LoginDataType} from "../../api/api";
import {StateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <div>
                <Field name={'login'} component={Input} validate={[requiredField]} placeholder='login'/>
            </div>
            <div>
                <Field name={'password'} component={Input} validate={[requiredField]} placeholder="password" type={'password'}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={Input} type={'checkbox'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


type LoginPropsType = {
    login: (loginData: LoginDataType) => void
    isAuth: boolean
}
const Login: React.FC<LoginPropsType> = (props) => {
    if (props.isAuth) return <Redirect to={'/profile'}/>

    const onSubmit = (formData: FormDataType) => {
        props.login({
            email: formData.login,
            password: formData.password,
            rememberMe: formData.rememberMe
        })
    }

    return (
        <div style={{padding: '10px 20px'}}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mstp = (state: StateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mstp, {login})(Login);