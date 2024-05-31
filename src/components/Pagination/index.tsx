import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { RootState } from "../../redux/store";
import { setActivePage } from "../../redux/slices/paginationSlice";

import styles from "./Pagination.module.scss";

const Pagination: FC = () => {
  const meta = useSelector((state: RootState) => state.pagination.meta);
  const activePage = useSelector(
    (state: RootState) => state.pagination.activePage
  );
  const dispatch = useDispatch();

  const onChangePage = (newActivePage: number) => {
    if (newActivePage < 1 || newActivePage > meta?.total_pages) return;
    dispatch(setActivePage(newActivePage));
  };

  return (
    <ul className={styles.items}>
      <li
        className={classNames({ [styles.disabled]: activePage === 1 })}
        onClick={() => onChangePage(activePage - 1)}
      >
        {"<"}
      </li>
      {[...Array(meta?.total_pages).keys()].map((i) => (
        <li
          className={classNames({ [styles.active]: activePage === i + 1 })}
          onClick={() => onChangePage(i + 1)}
          key={i}
        >
          {i + 1}
        </li>
      ))}
      <li
        className={classNames({
          [styles.disabled]: activePage === meta?.total_pages,
        })}
        onClick={() => onChangePage(activePage + 1)}
      >
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;
