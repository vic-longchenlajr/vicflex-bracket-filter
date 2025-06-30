"use client";

import { useEffect, useState } from "react";
import styles from "./styles/displaycolumn.module.css";
import ItemCard from "./item-card";
import FilterColumn from "./filter-column";
import Searchbar from "./search-bar";
import * as XLSX from "xlsx";

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

// const fileURL = `https://vortex-bom.victaulicmobile.com/us-config/bracket-filter/database/VicFlex-Bracket-Calculator-Values-6.9.25.xlsx`;
const fileURL = `database/VicFlex-Bracket-Calculator-Values-6.19.25.xlsx`;

const Displaycolumn = () => {
  const [bracketData, setBracketData] = useState<BracketConfig[]>([]);
  const [filteredData, setFilteredData] = useState<BracketConfig[]>([]);
  const [activeFilters, setActiveFilters] = useState<
    Record<string, Set<string>>
  >({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await importBracketConfigurations(fileURL);
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
    const isInMm = numeric > 10;

    const result = source.filter((item) => {
      const matchesFilters = Object.entries(filters).every(
        ([category, values]) => {
          if (values.size === 0) return true;
          const key = fieldMap[category];
          const itemValue = String(item[key]).toLowerCase(); // force case match
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

  const handleFilterChange = (filters: Record<string, Set<string>>) => {
    setActiveFilters(filters);
    updateResults(bracketData, filters, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateResults(bracketData, activeFilters, query);
  };

  return (
    <div className={styles.displayWrapper}>
      <FilterColumn onFilter={handleFilterChange} />
      <Searchbar onSearch={handleSearchChange} />
      <div className={styles.displayArea}>
        {filteredData.map((item) => (
          <ItemCard {...item} key={item.key} />
        ))}
      </div>
    </div>
  );
};

export async function importBracketConfigurations(
  fileURL: string,
  sheetName: string = "Configs"
): Promise<BracketConfig[]> {
  const REMOTE_FILE_URL =
    "https://vortex-bom.victaulicmobile.com/us-config/bracket-filter/database/VicFlex-Bracket-Calculator-Values-6.19.25.xlsx";
  const LOCAL_FILE_URL =
    "database/VicFlex-Bracket-Calculator-Values-6.19.25.xlsx";

  const REMOTE_IMG_BASE =
    "https://vortex-bom.victaulicmobile.com/us-config/bracket-filter/screenshots/";
  const LOCAL_IMG_BASE = "screenshots/";

  const tryLoadData = async (url: string, imageBase: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) throw new Error(`Sheet "${sheetName}" not found.`);

      const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      const parseInchesOrNA = (val: any): number | "N/A" =>
        val.toString().toUpperCase() === "N/A"
          ? "N/A"
          : Math.round(parseFloat(val) * 100) / 100 || 0;

      const parseMmOrNA = (val: any): number | "N/A" =>
        val.toString().toUpperCase() === "N/A"
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

        const screenshotFile = screenshot.toString().split("\\").pop();
        const imageSrc = imageBase + screenshotFile;

        data.push({
          product: product.toString().trim(),
          reducer: reducer.toString().trim(),
          sprinklerType: sprinklerType.toString().trim(),
          bracketType: bracketType.toString().trim(),
          gridType: gridType.toString().trim(),
          dMinIn: parseInchesOrNA(dMinIn),
          dMaxIn: parseInchesOrNA(dMaxIn),
          dMinMm: parseMmOrNA(dMinMm),
          dMaxMm: parseMmOrNA(dMaxMm),
          imageSrc,
          key: i - 1,
        });
      }

      return data;
    } catch (error) {
      console.error(`Failed to load data from ${url}:`, error);
      return [];
    }
  };

  // Try remote first
  const remoteData = await tryLoadData(REMOTE_FILE_URL, REMOTE_IMG_BASE);
  if (remoteData.length > 0) {
    console.log("DATA LOADED FROM REMOTE");
    return remoteData;
  }

  // Fallback to local
  console.log("DATA LOADED FROM LOCAL");
  return await tryLoadData(LOCAL_FILE_URL, LOCAL_IMG_BASE);
}

export default Displaycolumn;
