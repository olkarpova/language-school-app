"use client";

import styles from "./Filters.module.css";

interface FiltersProps {
  languages: string[];
  levels: string[];
  prices: number[];
  selectedLanguage: string;
  selectedLevel: string;
  selectedPrice: string;
  onLanguageChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceChange: (value: string) => void;
}

export default function Filters({
  languages,
  levels,
  prices,
  selectedLanguage,
  selectedLevel,
  selectedPrice,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}: FiltersProps) {
  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span className={styles.label}>Languages</span>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className={styles.select}
        >
          <option value="">All</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Level of knowledge</span>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className={styles.select}
        >
          <option value="">All</option>
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Price</span>
        <select
          value={selectedPrice}
          onChange={(e) => onPriceChange(e.target.value)}
          className={styles.select}
        >
          <option value="">All</option>
          {prices.map((price) => (
            <option key={price} value={price}>{price} $</option>
          ))}
        </select>
      </label>
    </div>
  );
}