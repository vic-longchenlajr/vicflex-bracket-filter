import Head from "next/head";
import styles from "@/styles/index.module.css";
import Navbar from "@/nav-bar";
import Displaycolumn from "@/display-column";

export default function Home() {
  let imageSrc =
    "https://vortex-bom.victaulicmobile.com/us-config/bracket-filter/resources/icon.ico";
  return (
    <>
      <Head>
        <title>Home | VicFlex Bracket Filter v0.1.4</title>
        <link rel="icon" href={imageSrc} type="image/png" />
      </Head>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.mainContainer}>
          <Displaycolumn />
        </div>
      </div>
    </>
  );
}
