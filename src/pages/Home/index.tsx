import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://reqres.in/api/users").then((res) => {
      setData(res.data.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className={styles.items}>
        {data.map((item) => (
          <Link to={`/user/${item.id}`} state={item}>
            <Card
              key={item.id}
              firstName={item.first_name}
              lastName={item.last_name}
              {...item}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
