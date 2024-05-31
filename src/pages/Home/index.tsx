import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Filter from "./components/Filter";

import { People } from "../../entities/model";

import { RootState } from "../../redux/store";
import { setMeta } from "../../redux/slices/filterSlice";

import Peoples from "./components/Peoples";
const Home: FC = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  const { activePage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const [data, setData] = useState<People[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstName = searchValue ? `&firstName=${searchValue}*` : "";
    axios
      .get(
        `https://8aacc4e8fbc52395.mokky.dev/peoples?page=${activePage}&limit=8${firstName}`,
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
  }, [activePage, searchValue]);

  return (
    <div className="container">
      {isAuthorized ? (
        <>
          <Filter />
          <Peoples data={data} />
        </>
      ) : (
        <Navigate to="/registration" />
      )}
    </div>
  );
};

export default Home;
