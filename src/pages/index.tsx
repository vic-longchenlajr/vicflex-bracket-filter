import Head from "next/head";
import styles from "@/styles/index.module.css";
import Navbar from "@/nav-bar";
import Displaycolumn from "@/display-column";

export default function Home() {
  let imageSrc = "/favicon.ico";
  return (
    <>
      <Head>
        <title>
          Home | VicFlex Bracket Filter v{process.env.NEXT_PUBLIC_APP_VERSION}
        </title>
        <link rel="icon" href={imageSrc} type="image/x-icon" />
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
