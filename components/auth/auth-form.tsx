/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useRef, useState } from 'react';

import { NextPage } from 'next';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import { SignUpPostRequest } from '../../pages/api/auth/signup';
import { SignInPostRequest } from '../../types/api';
import classes from './auth-form.module.css';

const createUser = async (email: string, password: string) => {
  const body: SignUpPostRequest = { email, password };

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Something wen wrong');

  return data;
};

const AuthForm: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const switchAuthModeHandler = () => setIsLogin((prevState) => !prevState);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (isLogin) {
      // log user in
      const options: SignInPostRequest = { redirect: false, email, password };
      const result = await signIn('credentials', options);
      if (!result.error) router.replace('/profile');
    } else {
      // create user
      try {
        const result = await createUser(email, password);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
