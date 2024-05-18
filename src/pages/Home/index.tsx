import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../App";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import styles from "./Home.module.scss";

const Home = () => {
  const { data, setData, isAuthorized, setIsAuthorized } =
    useContext(DataContext);
  const [meta, setMeta] = useState({});
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://8aacc4e8fbc52395.mokky.dev/peoples?page=${pageIndex}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.items);
        setMeta(res.data.meta);
        setIsAuthorized(true);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log("unauthorized");
        }
      });
  }, [pageIndex]);

  return (
    <div className="container">
      {isAuthorized ? (
        <>
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
        </>
      ) : (
        <Navigate to="/registration" />
      )}
    </div>
  );
};

export default Home;
