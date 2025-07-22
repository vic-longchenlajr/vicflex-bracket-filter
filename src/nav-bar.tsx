import Image from "next/image"; // Import Image for optimized images in Next.js
import styles from "./styles/navbar.module.css"; // Import CSS module

const Navbar = () => {
  return (
    <>
      <div className={styles.navBar}>
        <Image
          src="logo_vicflex.png"
          alt="VicFlex Logo"
          width={126}
          height={84}
          className={styles.logo}
        ></Image>
        <h3>Bracket Filter v0.1.3</h3>
      </div>
    </>
  );
};

export default Navbar;
