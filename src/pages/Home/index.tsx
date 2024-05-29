import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Peoples from "./components/Peoples";

const Home: FC = () => {
  const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
  const [data, setData] = useState([]);
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
        <Peoples
          data={data}
          meta={meta}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      ) : (
        <Navigate to="/registration" />
      )}
    </div>
  );
};

export default Home;
