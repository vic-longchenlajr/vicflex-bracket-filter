import { useState } from "react";
import styles from "./styles/filtercolumn.module.css";

const filterOptions = {
  Product: ["VS1", "AH1/2"],
  Reducer: [
    "VS1",
    '5-3/4" Straight',
    "Low profile Long Elbow",
    "Low profile Short Elbow",
    "Standard Long Elbow",
    "Standard Short Elbow",
  ],
  "Sprinkler Type": [
    "Concealed Pendent",
    "Sleeve & Skirt Pendent",
    "Recessed Pendent",
  ],
  "Bracket Type": [
    "VB2",
    "VB3",
    "VB4",
    "VB5",
    "AB2",
    "AB4",
    "AB5",
    "AB7",
    "AB11",
  ],
  "Grid Type": [
    "T Grid",
    "Data Center Grid",
    "Wood/Metal Joist",
    "Hat Channel",
  ],
};

const FilterColumn = ({
  onFilter,
}: {
  onFilter: (selected: Record<string, Set<string>>) => void;
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});

  const toggleExpand = (category: string) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleToggle = (category: string, option: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev[category] || []);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      const updated = { ...prev, [category]: newSet };
      onFilter(updated); // ✅ Notify parent of filter change
      return updated;
    });
  };

  const isSelected = (category: string, option: string) => {
    return selected[category]?.has(option);
  };
  const getHeader = (category: string) => {
    if (expanded[category]) return { text: category, isSummary: false };

    const set = selected[category];
    if (!set || set.size === 0) return { text: category, isSummary: false };

    const vals = Array.from(set);
    if (vals.length === 1) return { text: vals[0], isSummary: true };

    return { text: `${category} (${vals.length})`, isSummary: true };
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filter by:</h3>
      {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category} className={styles.filterSection}>
          <button
            onClick={() => toggleExpand(category)}
            className={styles.filterToggle}
          >
            <span className={styles.triangle}>
              {expanded[category] ? "▼" : "▶"}
            </span>{" "}
            <span
              className={`${styles.filterTitle} ${
                getHeader(category).isSummary ? styles.selectedSummary : ""
              }`}
            >
              {getHeader(category).text}
            </span>{" "}
          </button>
          {expanded[category] && (
            <ul className={styles.optionList}>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleToggle(category, option)}
                  className={`${styles.optionItem} ${
                    isSelected(category, option) ? styles.selected : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterColumn;
