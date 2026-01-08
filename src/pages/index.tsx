import Head from "next/head";
import styles from "@/styles/index.module.css";
import Navbar from "@/nav-bar";
import Displaycolumn from "@/display-column";

export default function Home() {
  let imageSrc = "/favicon.ico";
  return (
    <>
      <Head>
        <title>Home | VicFlex Bracket Filter v1.0.0</title>
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
