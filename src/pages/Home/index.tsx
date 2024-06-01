import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Filter from "../../components/Filter";

import { People } from "../../entities/model";

import { RootState } from "../../redux/store";
import { setMeta } from "../../redux/slices/filterSlice";

import styles from "./Home.module.scss";

import Peoples from "./components/Peoples";
const Home: FC = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  const { activePage, searchValue, gender, age, city } = useSelector(
    (state: RootState) => state.filter
  );

  const [data, setData] = useState<People[]>([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const firstNameParam = searchValue ? `&firstName=${searchValue}*` : "";
    const genderParam = gender !== "any" ? `&gender=${gender}` : "";
    const ageParam = `&age[from]=${age.from}&age[to]=${age.to}`;
    const cityParam = city ? `&city=${city}*` : "";
    try {
      const res = await axios.get(
        `https://8aacc4e8fbc52395.mokky.dev/peoples?page=${activePage}&limit=6${firstNameParam}${genderParam}${ageParam}${cityParam}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(res.data.items);
      dispatch(setMeta(res.data.meta));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activePage, searchValue, gender, age, city]);

  return (
    <div className={`container ${styles.container}`}>
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
