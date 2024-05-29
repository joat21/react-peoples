import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";

import styles from "../Home.module.scss";

const Peoples = (props) => {
  const { data, meta, pageIndex, setPageIndex } = props;
  return (
    <>
      <div className={styles.items}>
        {data.map((item) => (
          <div key={item.id} className={styles["card-wrapper"]}>
            <Link to={`/user/${item.id}`} state={item}>
              <Card {...item} />
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        meta={meta}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
};

export default Peoples;
