import { ContactsType } from '../../../../redux/profile-reducer'
import React, { FC } from 'react'
import styles from '../../Profile.module.css'

type ContactsPropsType = {
  contacts: ContactsType
}
export const Contacts: FC<ContactsPropsType> = props => {
  return (
    <div className={styles.contacts}>
      <p className={styles.contactsTitle}>Contacts</p>
      <div className={styles.contactsItems}>
        {Object.entries(props.contacts).map(c => (
          <p key={c[0]}>
            {c[0]}: {c[1]}
          </p>
        ))}
      </div>
    </div>
  )
}
