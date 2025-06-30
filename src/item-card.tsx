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

const ItemCard = ({
  product,
  reducer,
  sprinklerType,
  bracketType,
  gridType,
  dMinIn,
  dMinMm,
  dMaxIn,
  dMaxMm,
  imageSrc,
}: ItemCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.topRow}>
        <div className={styles.info}>
          <img
            src={expanded ? "contract.png" : "expand.png"}
            alt={expanded ? "Contract" : "Expand"}
            className={styles.expandIcon}
            width={24}
            height={24}
            onClick={toggleExpand}
          />
          <p>
            <strong>Product:</strong> {product}
          </p>
          <p>
            <strong>Reducer:</strong> {reducer}
          </p>
          <p>
            <strong>Sprinkler Type:</strong> {sprinklerType}
          </p>
          <p>
            <strong>Bracket Type:</strong> {bracketType}
          </p>
          <p>
            <strong>Grid Type:</strong> {gridType}
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
                <td>{dMinIn}</td>
                <td>{dMinMm}</td>
              </tr>
              <tr>
                <td>"D" Max:</td>
                <td>{dMaxIn}</td>
                <td>{dMaxMm}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <a>
          <img
            src={imageSrc}
            alt="Bracket configuration"
            className={styles.image}
          />
        </a>
      </div>
    </div>
  );
};

export default ItemCard;
