import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Input from "../../common/Input/Input";
import {requiredField} from "../../utils/validators";


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
                <Field name={'password'} component={Input} validate={[requiredField]} placeholder="password"/>
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

const Login = () => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <div style={{padding: '10px 20px'}}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;