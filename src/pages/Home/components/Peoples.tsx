import { FC } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";

import { People } from "../../../entities/model";

import styles from "../Home.module.scss";

type PeoplesProps = {
  data: People[];
};

const Peoples: FC<PeoplesProps> = ({ data }: PeoplesProps) => {
  return (
    <>
      <div className={styles.items}>
        {data.map((item) => (
          <div key={item.id} className={styles["card-wrapper"]}>
            <Link to={`/user/${item.id}`}>
              <Card {...item} />
            </Link>
          </div>
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default Peoples;
