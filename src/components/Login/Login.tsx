import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import Input from '../../common/Input/Input'
import { requiredField } from '../../utils/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { LoginDataType } from '../../api/api'
import { RootStateType } from '../../redux/redux-store'
import { Redirect } from 'react-router-dom'

type FormDataType = {
  login: string
  password: string
  rememberMe: boolean
  captcha?: string
}

type LoginFormPropsType = {
  captcha: string | null
}

const LoginForm: React.FC<LoginFormPropsType & InjectedFormProps<FormDataType, LoginFormPropsType>> = props => {
  return (
    <form onSubmit={props.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div>
        <Field name={'login'} component={Input} validate={[requiredField]} placeholder="login" />
      </div>
      <div>
        <Field
          name={'password'}
          component={Input}
          validate={[requiredField]}
          placeholder="password"
          type={'password'}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Field name={'rememberMe'} component={Input} type={'checkbox'} /> Remember me
      </div>
      {props.captcha && (
        <div>
          <img src={props.captcha} alt="captcha" />
          <Field name={'captcha'} placeholder={'Enter captcha'} component={Input} validate={[requiredField]} />
        </div>
      )}
      <div>
        <span style={{ color: 'red' }}>{props.error}</span>
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({ form: 'login' })(LoginForm)

type LoginPropsType = {
  login: (loginData: LoginDataType) => void
  captcha: string | null
  isAuth: boolean
}
const Login: React.FC<LoginPropsType> = props => {
  if (props.isAuth) return <Redirect to={'/profile'} />

  const onSubmit = (formData: FormDataType) => {
    props.login({
      email: formData.login,
      password: formData.password,
      rememberMe: formData.rememberMe,
      captcha: formData.captcha,
    })
  }

  return (
    <div style={{ padding: '10px 20px' }}>
      <h1>LOGIN</h1>
      <LoginReduxForm captcha={props.captcha} onSubmit={onSubmit} />
    </div>
  )
}

const mstp = (state: RootStateType) => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha,
})

export default connect(mstp, { login })(Login)
