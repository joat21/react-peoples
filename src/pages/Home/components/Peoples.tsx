import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";
import Skeleton from "../../../components/Card/Skeleton";

import { People } from "../../../entities/model";
import { PAGE_SIZE } from "../../../entities/constants";

import { RootState } from "../../../redux/store";

import styles from "../Home.module.scss";

type PeoplesProps = {
  isLoading: boolean;
  data: People[];
};

const Peoples: FC<PeoplesProps> = (props: PeoplesProps) => {
  const { isLoading, data } = props;
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

  const skeletons = [...new Array(PAGE_SIZE)].map((_, i) => (
    <Skeleton key={i} />
  ));
  const peoples = filteredData.map((item) => (
    <div key={item.id} className={styles["card-wrapper"]}>
      <Link to={`/user/${item.id}`}>
        <Card {...item} />
      </Link>
    </div>
  ));

  return (
    <div>
      <div className={styles.items}>{isLoading ? skeletons : peoples}</div>
      {pagesCount > 1 && <Pagination />}
    </div>
  );
};

export default Peoples;
