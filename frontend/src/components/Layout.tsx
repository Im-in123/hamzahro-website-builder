// components/Layout.tsx
import React from "react";
import Link from "next/link";
import styles from "@/styles/Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Website Builder Dashboard</h1>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/page-designer">Page Designer</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; 2023 Your Website Builder</p>
      </footer>
    </div>
  );
};

export default Layout;
