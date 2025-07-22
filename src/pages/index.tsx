import Head from "next/head";
import styles from "@/styles/index.module.css";
import Navbar from "@/nav-bar";
import Displaycolumn from "@/display-column";

export default function Home() {
  return (
    <>
      <Head>
        <title>VicFlex Bracket Filter v0.1.3</title>
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
