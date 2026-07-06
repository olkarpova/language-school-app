'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useAuth } from '../AuthProvider/AuthProvider';
import { logoutUser } from '@/lib/firebase';

const Header = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    
    const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.navBlock}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="LearnLingo" width={28} height={28} />
          LearnLingo
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/teachers" className={styles.navLink}>
            Teachers
          </Link>
        </nav>
      </div>

      <div className={styles.authBlock}>
        {user ? (
          <>
            <span className={styles.userName}>{user.displayName || user.email}</span>
            <button type="button" className={styles.loginBtn} onClick={() => logoutUser()}>
              <Image src="/login.svg" alt="LogOut" width={20} height={20} />
              Log out
            </button>
          </>
        ) : (
          <>
            <button type="button" className={styles.loginBtn} onClick={() => setIsLoginOpen(true)}>
              <Image src="/login.svg" alt="LogIn" width={20} height={20} />
              Log in
            </button>
            <button
              type="button"
              className={styles.registerBtn}
              onClick={() => setIsRegisterOpen(true)}
            >
              Registration
            </button>
          </>
        )}
      </div>

      {isRegisterOpen && (
        <Modal onClose={() => setIsRegisterOpen(false)}>
          <RegisterForm onClose={() => setIsRegisterOpen(false)} />
        </Modal>
      )}
      {isLoginOpen && (
        <Modal onClose={() => setIsLoginOpen(false)}>
          <LoginForm onClose={() => setIsLoginOpen(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
