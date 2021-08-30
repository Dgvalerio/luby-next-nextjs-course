/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';

import classes from './profile-form.module.css';

const ProfileForm: NextPage = () => (
  <form className={classes.form}>
    <div className={classes.control}>
      <label htmlFor="new-password">New Password</label>
      <input type="password" id="new-password" />
    </div>
    <div className={classes.control}>
      <label htmlFor="old-password">Old Password</label>
      <input type="password" id="old-password" />
    </div>
    <div className={classes.action}>
      <button type="submit">Change Password</button>
    </div>
  </form>
);

export default ProfileForm;
