import { NextPage } from 'next';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

const UserProfile: NextPage = () => (
  // Redirect away if NOT auth

  <section className={classes.profile}>
    <h1>Your User Profile</h1>
    <ProfileForm />
  </section>
);

export default UserProfile;
