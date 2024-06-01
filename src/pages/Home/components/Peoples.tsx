import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";

import { People } from "../../../entities/model";
import { PAGE_SIZE } from "../../../entities/constants";

import { RootState } from "../../../redux/store";

import styles from "../Home.module.scss";

type PeoplesProps = {
  data: People[];
};

const Peoples: FC<PeoplesProps> = ({ data }: PeoplesProps) => {
  const { activePage, pagesCount } = useSelector(
    (state: RootState) => state.filter
  );

  const filteredData = useMemo(() => {
    if (!data.length) return [];

    return data.slice(
      PAGE_SIZE * (activePage - 1),
      PAGE_SIZE + PAGE_SIZE * (activePage - 1)
    );
  }, [data, activePage]);

  return (
    <div>
      <div className={styles.items}>
        {filteredData.map((item) => (
          <div key={item.id} className={styles["card-wrapper"]}>
            <Link to={`/user/${item.id}`}>
              <Card {...item} />
            </Link>
          </div>
        ))}
      </div>
      {pagesCount > 1 && <Pagination />}
    </div>
  );
};

export default Peoples;
