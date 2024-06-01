import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Filter from "../../components/Filter";
import Peoples from "./components/Peoples";

import { People } from "../../entities/model";
import { PAGE_SIZE } from "../../entities/constants";

import { RootState } from "../../redux/store";
import { setPagesCount } from "../../redux/slices/filterSlice";

import styles from "./Home.module.scss";

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

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
    const ageParam = `age[from]=${age.from}&age[to]=${age.to}`;
    const cityParam = city ? `&city=${city}*` : "";

    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://8aacc4e8fbc52395.mokky.dev/users?${ageParam}${firstNameParam}${genderParam}${cityParam}`
      );
      setData(res.data);
      dispatch(setPagesCount(Math.ceil(res.data.length / PAGE_SIZE)));
      setIsLoading(false);
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
          <Peoples isLoading={isLoading} data={data} />
        </>
      ) : (
        <Navigate to="/registration" />
      )}
    </div>
  );
};

export default Home;
