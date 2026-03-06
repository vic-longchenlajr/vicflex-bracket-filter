import Head from "next/head";
import styles from "@/styles/help.module.css";
import Navbar from "@/nav-bar";

const Pin = ({ n }: { n: number }) => <span className={styles.pin}>{n}</span>;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const example1 = `${basePath}/resources/example1.png`;
const example2 = `${basePath}/resources/example2.png`;
const dval2 = `${basePath}/resources/dval2.png`;
let imageSrc = `${basePath}/favicon.ico`;

export default function Help() {
  return (
    <>
      <Head>
        <title>
          Help | VicFlex Bracket Filter v{process.env.NEXT_PUBLIC_APP_VERSION}
        </title>
        <link rel="icon" href={imageSrc} type="image/x-icon" />
      </Head>
      <Navbar />

      <main className={styles.container}>
        <header className={styles.hero}>
          <h1>How to Use the Bracket Filter</h1>
          <p>
            Select the compatible bracket and confirm grid fit using your
            project’s <strong>D</strong> value.
          </p>
        </header>

        <section id="quick-start" className={styles.cards}>
          <article className={styles.card}>
            <h3>Quick Start A — Find a compatible bracket</h3>
            <ol>
              <li>
                Choose <strong>Product</strong> (e.g., VS1)
              </li>
              <li>
                Select <strong>Reducer</strong>
              </li>
              <li>
                Select <strong>Sprinkler Type</strong>
              </li>
              <li>
                Select <strong>Grid Type</strong>
              </li>
            </ol>
            <p className={styles.tip}>
              Tip: If multiple brackets appear, use the D value to narrow
              choices.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Quick Start B — Confirm grid fit</h3>
            <ol>
              <li>
                Enter your project’s <strong>D</strong> value in the search bar
              </li>
              <li>
                Verify it falls within the <strong>D Min/Max</strong> range
                shown
              </li>
            </ol>
            <p className={styles.orange}>
              If your D is outside the range, select a different bracket.
            </p>
          </article>
        </section>

        <section id="example-1" className={styles.example}>
          <h2>Example 1: Searching for a compatible bracket</h2>
          <figure className={styles.figure}>
            <img
              className={styles.guideImage}
              src={example1}
              alt="Example 1 annotated UI"
            />
            <figcaption className={styles.legend}>
              <ul>
                <li className={styles.red}>
                  <Pin n={1} /> Choose <strong>VS1</strong>
                </li>
                <li className={styles.green}>
                  <Pin n={2} /> Select{" "}
                  <strong>Sleeve &amp; Skirt Pendant</strong>
                </li>
                <li className={styles.blue}>
                  <Pin n={3} /> Choose <strong>T Grid</strong>
                </li>
                <li className={styles.orange}>
                  <Pin n={4} /> Review <strong>D Min/Max</strong> table
                </li>
              </ul>
            </figcaption>
          </figure>
        </section>

        <section id="example-2" className={styles.example}>
          <h2>Example 2: Grid fit confirmation</h2>
          <figure className={styles.figure}>
            <img
              className={styles.guideImage}
              src={example2}
              alt="Example 2 annotated UI"
            />
            <figcaption className={styles.legend}>
              <ul>
                <li className={styles.orange}>
                  <Pin n={1} /> Enter project <strong>D</strong> (e.g., 2.375″)
                  in the <strong>search bar</strong>
                </li>
                <li className={styles.red}>
                  <Pin n={2} /> Choose <strong>VS1</strong>{" "}
                </li>
                <li className={styles.green}>
                  <Pin n={3} /> Select <strong>Concealed Pendent</strong>{" "}
                </li>
                <li className={styles.blue}>
                  <Pin n={4} /> Choose <strong>VB5</strong>{" "}
                </li>
                <li className={styles.purple}>
                  <Pin n={5} /> Select <strong>Data Center Grid</strong>{" "}
                </li>
                <li className={styles.orange}>
                  <Pin n={6} /> Confirm the bracket’s <strong>D Min/Max</strong>{" "}
                  includes your value
                </li>
              </ul>
            </figcaption>
          </figure>
        </section>

        <section id="d-value" className={styles.callout}>
          <h2>What is the “D” value?</h2>
          <div className={styles.calloutBody}>
            <img className={styles.dImage} src={dval2} alt="D value diagram" />
            <p>
              "D" is the distance from the finished ceiling tile or panel to the
              top of the ceiling grid that the VicFlex bracket is mounted to.
              This information is typically found in the ceiling submittal
              package for a project.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
