import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { RootState } from "../../redux/store";
import { setActivePage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

const Pagination: FC = () => {
  const activePage = useSelector((state: RootState) => state.filter.activePage);
  const pagesCount = useSelector((state: RootState) => state.filter.pagesCount);
  const dispatch = useDispatch();

  console.log(pagesCount);

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  // if (pagesCount > 0) {
  //   pages = useMemo(() => {
  //     Array.from({ length: pagesCount }, (_, i) => i + 1);
  //   }, [pagesCount]);
  // }

  console.log(pages);

  return (
    <div className={styles.items}>
      {pagesCount > 0 &&
        pages.map((i) => (
          <button
            className={classNames({ [styles.active]: activePage === i })}
            key={i}
            onClick={() => dispatch(setActivePage(i))}
          >
            {i}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
