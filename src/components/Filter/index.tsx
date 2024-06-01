import { FC } from "react";

import Search from "./components/Search";
import GenderRadio from "./components/GenderRadio";
import AgeFilter from "./components/AgeFilter";

import styles from "./Filter.module.scss";

const Filter: FC = () => {
  return (
    <div className={styles.filter}>
      <Search />
      <GenderRadio />
      <AgeFilter />
    </div>
  );
};

export default Filter;
