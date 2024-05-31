import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { setSearchValue } from "../../../redux/slices/filterSlice";

import styles from "../Home.module.scss";

const Filter: FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  return (
    <div className={styles.filter}>
      <input
        className="input"
        type="text"
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
    </div>
  );
};

export default Filter;
