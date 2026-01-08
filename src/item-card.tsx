import { useEffect, useState, useMemo } from "react";
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

const SUBMITTAL_LINKS = {
  VS1: "https://assets.victaulic.com/assets/uploads/literature/10.91.pdf",
  AH1: "https://assets.victaulic.com/assets/uploads/literature/10.95.pdf",
  AH2: "https://assets.victaulic.com/assets/uploads/literature/10.85.pdf",
} as const;
const ProductLinks = ({ product }: { product: string }) => {
  const normalized = product.replace(/\s+/g, "").toUpperCase();

  if (normalized === "VS1") {
    return (
      <a
        href={SUBMITTAL_LINKS.VS1}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="VS1 submittal (opens in a new tab)"
      >
        VS1
      </a>
    );
  }

  // Support "AH1/2" and "AH1/AH2"
  if (normalized === "AH1/2" || normalized === "AH1/AH2") {
    return (
      <>
        <a
          href={SUBMITTAL_LINKS.AH1}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AH1 submittal (opens in a new tab)"
        >
          AH1
        </a>
        /
        <a
          href={SUBMITTAL_LINKS.AH2}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AH2 submittal (opens in a new tab)"
        >
          AH2
        </a>
      </>
    );
  }

  // Fallback: just show the text if an unexpected value appears
  return <>{product}</>;
};

/** --- Build context-aware notes for the card --- */
function buildNotes(product: string, sprinklerType: string): string[] {
  const notes: string[] = [];
  const prod = product.replace(/\s+/g, "").toUpperCase(); // "VS1" or "AH1/2"/"AH1/AH2"
  const st = sprinklerType.toLowerCase();

  const isRecessed = /recessed\s*pendent/.test(st);
  const isConcealed = /concealed\s*pendent/.test(st);
  const isAH = prod === "AH1/2" || prod === "AH1/AH2";

  if (isRecessed) {
    notes.push(
      'For recessed pendent sprinklers: the values provided are for ¾" adjustment escutcheon.'
    );
  }
  if (isAH && isRecessed) {
    notes.push(
      "For AH1/AH2 with recessed pendent sprinklers: the values provided are for V2708 sprinkler; values may be slightly different for other recessed pendent sprinklers."
    );
  }
  if (isAH && isConcealed) {
    notes.push(
      "For AH1/AH2 with concealed pendent sprinklers: the values provided are for the V3802 sprinkler; values may be slightly different for other concealed pendent sprinklers."
    );
  }
  return notes;
}

const ItemCard = (props: ItemCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const toggleExpand = () => setExpanded((p) => !p);

  const assetsBase = "/resources/";

  const notes = useMemo(
    () => buildNotes(props.product, props.sprinklerType),
    [props.product, props.sprinklerType]
  );
  const hasNotes = notes.length > 0;
  useEffect(() => {
    const open = expanded || notesOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded, notesOpen]);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (notesOpen) setNotesOpen(false);
        if (expanded) setExpanded(false);
      }
    };

    if (expanded || notesOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, notesOpen]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.info}>
            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={toggleExpand}
                aria-haspopup="dialog"
                aria-expanded={expanded}
                aria-label={
                  expanded ? "Close expanded view" : "Open expanded view"
                }
              >
                <img
                  src={assetsBase + "expand.png"}
                  alt=""
                  className={styles.expandIcon}
                  width={24}
                  height={24}
                />
              </button>
              {hasNotes && (
                <button
                  type="button"
                  className={styles.notesPill}
                  onClick={() => setNotesOpen(true)}
                  aria-haspopup="dialog"
                  aria-label="Open important notes"
                >
                  Notes
                </button>
              )}
            </div>
            <p>
              <strong>Product:</strong> <ProductLinks product={props.product} />
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

      {/* Existing expand modal */}
      {expanded && (
        <div className={styles.modalOverlay} onClick={toggleExpand}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeaderArea}>
              <div className={styles.modalHeaderRow}>
                <div className={styles.modalInfo}>
                  <p>
                    <strong>Product:</strong>{" "}
                    <ProductLinks product={props.product} />
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
                <div className={styles.modalNotes}>
                  {hasNotes ? (
                    <div className={styles.notesCard}>
                      <div className={styles.notesCardHeader}>
                        Important Notes
                      </div>
                      <div className={styles.notesBody}>
                        <ul className={styles.notesList}>
                          {notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className={styles.modalUnits}>
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

              <div className={styles.modalImageArea}>
                <img
                  src={props.imageSrc}
                  alt={props.imageSrc}
                  className={styles.modalImage}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New notes modal */}
      {notesOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setNotesOpen(false)}
        >
          <div
            className={`${styles.modalContent} ${styles.notesModalContent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="notes-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 id="notes-title">Important Notes</h3>
              {/* <button
                type="button"
                className={styles.closeBtn}
                aria-label="Close notes"
                onClick={() => setNotesOpen(false)}
              >
                ×
              </button> */}
            </div>

            <ul className={`${styles.notesList} ${styles.notesListScroll}`}>
              {notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
