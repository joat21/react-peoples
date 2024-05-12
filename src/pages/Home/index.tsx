import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";
import axios from "axios";
import Card from "../../components/Card";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    axios
      .get("https://8aacc4e8fbc52395.mokky.dev/users")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="container">
      <div className={styles.items}>
        {data.map((item) => (
          <Link to={`/user/${item.id}`} key={item.id} state={item.id}>
            <Card {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
