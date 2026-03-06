"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const imageSrc = `${basePath}/resources/`;

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.navBar}>
      {/* Logo + Title */}
      <div className={styles.brand}>
        <Image
          src={imageSrc + "logo_vicflex.png"}
          alt="VicFlex Logo"
          width={140}
          height={90}
          className={styles.logo}
          priority
        />
        <span className={styles.title}>
          Bracket Filter v{process.env.NEXT_PUBLIC_APP_VERSION}
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.menu}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/help" className={styles.navLink}>
          Help
        </Link>
        <a
          href="mailto:applications.engineering@victaulic.com"
          className={styles.navLink}
        >
          Contact
        </a>
      </nav>

      {/* Mobile Hamburger */}
      <button
        type="button"
        className={styles.hamburger}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setMenuOpen(false)}
          role="presentation"
        >
          <div
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu</span>
              <button
                type="button"
                className={styles.drawerClose}
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.drawerLinks}>
              <Link
                href="/"
                className={styles.drawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/help"
                className={styles.drawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Help
              </Link>
              <a
                href="mailto:applications.engineering@victaulic.com"
                className={styles.drawerLink}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
