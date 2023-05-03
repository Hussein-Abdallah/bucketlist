import React, {useState} from 'react';

import classNames from 'classnames';

import {Login, Register} from './components';

import styles from './AuthPage.module.css';

export function AuthPage() {
  const [isNewUser, setIsNewUser] = useState(false);
  console.log(isNewUser);

  return (
    <div className={classNames('w-100', styles.HeroContainer)}>
      <div className="d-flex align-items-center justify-content-center h-100 w-100 bg-black bg-opacity-50">
        <Login isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
        <Register isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
      </div>
    </div>
  );
}
