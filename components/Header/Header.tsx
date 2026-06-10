import Link from "next/link";
import styles from "./Header.module.css"
import Image from "next/image";

const Header = () => {
    return (
        <header className={styles.header} >
            <div className={styles.navBlock}>
                <Link href="/" className={styles.logo}>
                    <Image src="/logo.svg" alt="LearnLingo" width={28} height={28} />
                    LearnLingo
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/theachers" className={styles.navLink}>Theachers</Link>
                </nav>
            </div>

            <div className={styles.authBlock}>
                
                <button type="button" className={styles.loginBtn}>
                    <Image src="/login.svg" alt="LogIn" width={20} height={20} />
                    Log in
                </button>
                <button type="button" className={styles.registerBtn}>Registration</button>
            </div>

        </header>
    );  
}

export default Header;
