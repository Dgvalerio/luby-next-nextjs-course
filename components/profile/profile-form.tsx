/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useRef } from 'react';

import { NextPage } from 'next';

import { ChangePasswordPostRequest } from '../../pages/api/user/change-password';
import classes from './profile-form.module.css';

const ProfileForm: NextPage<{
  onChangePassword: (passwordData: ChangePasswordPostRequest) => void;
}> = ({ onChangePassword }) => {
  const oldPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const oldPassword = oldPasswordInputRef.current.value;
    const newPassword = newPasswordInputRef.current.value;

    if (!oldPassword || !newPassword) return;

    onChangePassword({
      oldPassword,
      newPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
