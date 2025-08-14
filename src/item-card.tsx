import { useState } from "react";
import styles from "./styles/itemcard.module.css";

interface ItemCardProps {
  product: string;
  reducer: string;
  sprinklerType: string;
  bracketType: string;
  gridType: string;
  dMinIn: number | "N/A";
  dMaxIn: number | "N/A";
  dMinMm: number | "N/A";
  dMaxMm: number | "N/A";
  imageSrc: string;
}

const ItemCard = (props: ItemCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };
  let imageSrc =
    "https://vortex-bom.victaulicmobile.com/us-config/bracket-filter/resources/";

  return (
    <>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.info}>
            <img
              src={imageSrc + "expand.png"}
              alt="Expand"
              className={styles.expandIcon}
              width={24}
              height={24}
              onClick={toggleExpand}
            />
            <p>
              <strong>Product:</strong> {props.product}
            </p>
            <p>
              <strong>Reducer:</strong> {props.reducer}
            </p>
            <p>
              <strong>Sprinkler Type:</strong> {props.sprinklerType}
            </p>
            <p>
              <strong>Bracket Type:</strong> {props.bracketType}
            </p>
            <p>
              <strong>Grid Type:</strong> {props.gridType}
            </p>
          </div>

          <div className={styles.dTableWrapper}>
            <table className={styles.dTable}>
              <thead>
                <tr>
                  <th>Units</th>
                  <th>in.</th>
                  <th>mm.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>"D" Min:</td>
                  <td>{props.dMinIn}</td>
                  <td>{props.dMinMm}</td>
                </tr>
                <tr>
                  <td>"D" Max:</td>
                  <td>{props.dMaxIn}</td>
                  <td>{props.dMaxMm}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={props.imageSrc}
            alt="Bracket configuration"
            className={styles.image}
          />
        </div>
      </div>

      {expanded && (
        <div className={styles.modalOverlay} onClick={toggleExpand}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc + "contract.png"}
              alt="Contract"
              className={styles.contractIcon}
              onClick={toggleExpand}
            />
            <div className={styles.topRow}>
              <div className={styles.info}>
                <p>
                  <strong>Product:</strong> {props.product}
                </p>
                <p>
                  <strong>Reducer:</strong> {props.reducer}
                </p>
                <p>
                  <strong>Sprinkler Type:</strong> {props.sprinklerType}
                </p>
                <p>
                  <strong>Bracket Type:</strong> {props.bracketType}
                </p>
                <p>
                  <strong>Grid Type:</strong> {props.gridType}
                </p>
              </div>

              <div className={styles.dTableWrapper}>
                <table className={styles.dTable}>
                  <thead>
                    <tr>
                      <th>Units</th>
                      <th>in.</th>
                      <th>mm.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>"D" Min:</td>
                      <td>{props.dMinIn}</td>
                      <td>{props.dMinMm}</td>
                    </tr>
                    <tr>
                      <td>"D" Max:</td>
                      <td>{props.dMaxIn}</td>
                      <td>{props.dMaxMm}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img
                src={props.imageSrc}
                alt={props.imageSrc}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
