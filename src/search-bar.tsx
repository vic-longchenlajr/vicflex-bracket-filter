import { useState } from "react";
import styles from "@/styles/searchbar.module.css";

const Searchbar = ({ onSearch }: any) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value); // Optional callback
  };

  return (
    <div className={styles.searchDiv}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder='Search by "D" value'
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>
          <a className={styles.searchIcon}>🔍</a>
        </span>
      </div>
      <p>
        "D" is the distance from the top of the ceiling grid to the finished
        face of ceiling panel.
      </p>
    </div>
  );
};

export default Searchbar;
