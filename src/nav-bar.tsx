import Image from "next/image";
import Link from "next/link";
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  const imageSrc =
    "https://vortex-bom.victaulicmobile.com/us-config/bracket-filter/resources/";

  return (
    <div className={styles.navBar}>
      {/* Logo + Title */}
      <div className={styles.brand}>
        <Image
          src={imageSrc + "logo_vicflex.png"}
          alt="VicFlex Logo"
          width={126}
          height={84}
          className={styles.logo}
        />
        <h3 className={styles.title}>Bracket Filter v0.1.4</h3>
      </div>

      {/* Navigation Menu */}
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
    </div>
  );
};

export default Navbar;
