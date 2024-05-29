import classNames from "classnames";
import styles from "./Pagination.module.scss";

const Pagination = (props) => {
  const { meta, pageIndex, setPageIndex } = props;

  const onChangePage = (newPageIndex) => {
    if (newPageIndex < 1 || newPageIndex > meta.total_pages) return;
    setPageIndex(newPageIndex);
  };

  return (
    <ul className={styles.items}>
      <li
        className={classNames({ [styles.disabled]: pageIndex === 1 })}
        onClick={() => onChangePage(pageIndex - 1)}
      >
        {"<"}
      </li>
      {[...Array(meta.total_pages).keys()].map((i) => (
        <li
          className={classNames({ [styles.active]: pageIndex === i + 1 })}
          onClick={() => onChangePage(i + 1)}
          key={i}
        >
          {i + 1}
        </li>
      ))}
      <li
        className={classNames({
          [styles.disabled]: pageIndex === meta.total_pages,
        })}
        onClick={() => onChangePage(pageIndex + 1)}
      >
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;
