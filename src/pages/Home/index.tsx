import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { People } from "../../entities/model";

import { RootState } from "../../redux/store";
import { setMeta } from "../../redux/slices/paginationSlice";

import Peoples from "./components/Peoples";

const Home: FC = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const activePage = useSelector(
    (state: RootState) => state.pagination.activePage
  );
  const [data, setData] = useState<People[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `https://8aacc4e8fbc52395.mokky.dev/peoples?page=${activePage}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.items);
        dispatch(setMeta(res.data.meta));
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log("unauthorized");
        }
      });
  }, [activePage]);

  return (
    <div className="container">
      {isAuthorized ? <Peoples data={data} /> : <Navigate to="/registration" />}
    </div>
  );
};

export default Home;
