import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../App";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import styles from "./Home.module.scss";

const Home = () => {
  const { data, setData } = useContext(DataContext);
  const [meta, setMeta] = useState({});
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://8aacc4e8fbc52395.mokky.dev/peoples?page=${pageIndex}&limit=8`
      )
      .then((res) => {
        setData(res.data.items);
        setMeta(res.data.meta);
      });
  }, [pageIndex]);

  return (
    <div className="container">
      <div className={styles.items}>
        {data.map((item) => (
          <Link to={`/user/${item.id}`} key={item.id} state={item}>
            <Card {...item} />
          </Link>
        ))}
      </div>
      <Pagination
        meta={meta}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </div>
  );
};

export default Home;
