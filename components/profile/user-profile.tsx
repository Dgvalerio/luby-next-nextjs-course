import { NextPage } from 'next';

import { ChangePasswordPostRequest } from '../../pages/api/user/change-password';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

const UserProfile: NextPage = () => {
  const changePasswordHandler = async (
    passwordData: ChangePasswordPostRequest
  ) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
};

export default UserProfile;
