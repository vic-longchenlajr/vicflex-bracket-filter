import { useState } from "react";
import styles from "@/styles/searchbar.module.css";

const Searchbar = ({ onSearch }: any) => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const toggleModal = () => setShowModal(!showModal);

  let imageSrc = "/resources/dval.png";

  return (
    <div className={styles.searchDiv}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder='Search by "D" value (inches or millimeters)'
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>
      <button
        type="button"
        onClick={toggleModal}
        className={styles.modalLinkBtn}
      >
        What’s this?
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Close notes"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <img
              src={imageSrc}
              alt='What is the "D" value?'
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
