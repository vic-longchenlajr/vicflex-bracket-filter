"use client";

import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import styles from "./styles/displaycolumn.module.css";
import ItemCard from "./item-card";
import FilterColumn from "./filter-column";
import Searchbar from "./search-bar";

interface BracketConfig {
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
  key: number;
}

/** =========================
 *  Remote configuration
 *  ========================= */
const REMOTE_BASE =
  "https://vortex-bom.victaulicmobile.com/us-config/bracket-filter";

const LOCAL_BASE = "/"; //public folder

const DB_PATH = "database";
const IMG_PATH = "screenshots";

// change only the file name when you update the spreadsheet
const FILE_NAME = "VicFlex-Bracket-Calculator-Values-10.28.25.xlsx";

// const REMOTE_XLSX_URL = `${REMOTE_BASE}/${DB_PATH}/${FILE_NAME}`;
// const REMOTE_IMG_BASE = `${REMOTE_BASE}/${IMG_PATH}/`;
const LOCAL_XLSX_URL = `${LOCAL_BASE}${DB_PATH}/${FILE_NAME}`;
const LOCAL_IMG_BASE = `${LOCAL_BASE}${IMG_PATH}/`;

const SHEET_NAME = "Configs";

const Displaycolumn = () => {
  const [bracketData, setBracketData] = useState<BracketConfig[]>([]);
  const [filteredData, setFilteredData] = useState<BracketConfig[]>([]);
  const [activeFilters, setActiveFilters] = useState<
    Record<string, Set<string>>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await importBracketConfigurations(
        LOCAL_XLSX_URL,
        SHEET_NAME
      );
      setBracketData(data);
      updateResults(data, activeFilters, searchQuery);
    };
    fetchData();
  }, []);

  const updateResults = (
    source: BracketConfig[],
    filters: Record<string, Set<string>>,
    search: string
  ) => {
    const fieldMap: Record<string, keyof BracketConfig> = {
      Product: "product",
      Reducer: "reducer",
      "Sprinkler Type": "sprinklerType",
      "Bracket Type": "bracketType",
      "Grid Type": "gridType",
    };

    const trimmed = search.trim();
    const numeric = parseFloat(trimmed);
    const isNumeric = !isNaN(numeric);
    const isInMm = numeric > 10; // your original heuristic

    const result = source.filter((item) => {
      const matchesFilters = Object.entries(filters).every(
        ([category, values]) => {
          if (!values || values.size === 0) return true;
          const key = fieldMap[category];
          if (!key) return true;
          const itemValue = String(item[key]).toLowerCase();
          return Array.from(values).some(
            (val) => itemValue === val.toLowerCase()
          );
        }
      );

      if (!matchesFilters) return false;

      if (isNumeric) {
        const min = isInMm ? item.dMinMm : item.dMinIn;
        const max = isInMm ? item.dMaxMm : item.dMaxIn;

        const parsedMin = min === "N/A" ? 0 : min;
        const parsedMax = max === "N/A" ? Infinity : max;

        return numeric >= parsedMin && numeric <= parsedMax;
      }

      return true;
    });

    setFilteredData(result);
  };

  const handleFilterChange = useCallback(
    (filters: Record<string, Set<string>>) => {
      setActiveFilters(filters);
      updateResults(bracketData, filters, searchQuery);
    },
    [bracketData, searchQuery]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateResults(bracketData, activeFilters, query);
    },
    [bracketData, activeFilters]
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);
  return (
    <div className={styles.displayWrapper}>
      <aside className={styles.sidebar}>
        <FilterColumn onFilter={handleFilterChange} />
      </aside>
      {filtersOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setFiltersOpen(false)}
          role="presentation"
        >
          <div
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className={styles.drawerHeader}>
              <strong>Filters</strong>
              <button type="button" onClick={() => setFiltersOpen(false)}>
                Close
              </button>
            </div>

            <FilterColumn onFilter={handleFilterChange} />
          </div>
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.topbar}>
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setFiltersOpen(true)}
          >
            Filters
          </button>

          <Searchbar onSearch={handleSearchChange} />
        </div>

        <div className={styles.displayArea}>
          {filteredData.map((item) => (
            <ItemCard {...item} key={item.key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Displaycolumn;

/** =========================
 *  Remote import only
 *  ========================= */
export async function importBracketConfigurations(
  xlsxUrl: string,
  sheetName: string = "Configs"
): Promise<BracketConfig[]> {
  try {
    const response = await fetch(xlsxUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${xlsxUrl}`);

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) throw new Error(`Sheet "${sheetName}" not found.`);

    const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    const parseInchesOrNA = (val: any): number | "N/A" =>
      String(val).toUpperCase() === "N/A"
        ? "N/A"
        : Math.round(parseFloat(val) * 100) / 100 || 0;

    const parseMmOrNA = (val: any): number | "N/A" =>
      String(val).toUpperCase() === "N/A"
        ? "N/A"
        : Math.round(parseFloat(val)) || 0;

    const data: BracketConfig[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row) continue;

      const [
        ,
        product,
        reducer,
        sprinklerType,
        bracketType,
        gridType,
        dMinIn,
        dMaxIn,
        dMinMm,
        dMaxMm,
        ,
        screenshot,
      ] = row;

      if (!product && !reducer && !sprinklerType && !bracketType) continue;

      const screenshotFile =
        String(screenshot)
          .split(/[/\\]+/)
          .pop() || "";
      const ts = Date.now();
      const imageSrc = `${LOCAL_IMG_BASE}${screenshotFile}?nocache=${ts}`;

      data.push({
        product: String(product).trim(),
        reducer: String(reducer).trim(),
        sprinklerType: String(sprinklerType).trim(),
        bracketType: String(bracketType).trim(),
        gridType: String(gridType).trim(),
        dMinIn: parseInchesOrNA(dMinIn),
        dMaxIn: parseInchesOrNA(dMaxIn),
        dMinMm: parseMmOrNA(dMinMm),
        dMaxMm: parseMmOrNA(dMaxMm),
        imageSrc,
        key: i - 1,
      });
    }

    return data;
  } catch (err) {
    console.error("Failed to load remote bracket configurations:", err);
    return []; // remote-only: just return empty on failure
  }
}
