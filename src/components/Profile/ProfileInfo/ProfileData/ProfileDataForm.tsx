import React, { FC } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ContactsType, ProfileDataType } from '../../../../redux/profile-reducer'

export type ProfileFormDataType = {
  fullName: string
  lookingForAJob: boolean
  contacts: ContactsType
}

type ProfileDataFormPropsType = {
  profile: ProfileDataType
}

const ProfileDataForm: FC<
  ProfileDataFormPropsType & InjectedFormProps<ProfileFormDataType, ProfileDataFormPropsType>
> = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && <div>{props.error}</div>}
      <Field placeholder={'Full name'} name={'fullName'} component={'input'} />

      <div>
        <span>Looking for a job: </span>
        <Field name={'lookingForAJob'} component={'input'} type={'checkbox'} />
      </div>

      <div>
        <Field placeholder={'description'} name={'lookingForAJobDescription'} component={'input'} />
      </div>

      <div>
        {Object.keys(props.profile.contacts).map(c => {
          return (
            <div key={c}>
              {c}: <Field name={`contacts.${c}`} component={'input'} />
            </div>
          )
        })}
      </div>

      {/*<Contacts contacts={props.profile.contacts} />*/}
      <button style={{ padding: '0 10px' }}>Submit</button>
    </form>
  )
}

export const ProfileDataReduxForm = reduxForm<ProfileFormDataType, ProfileDataFormPropsType>({ form: 'edit-profile' })(
  ProfileDataForm,
)
