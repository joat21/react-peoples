import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { setCity, setActivePage } from "../../../redux/slices/filterSlice";

const CityFilter: FC = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.filter.city);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(e.target.value));
    dispatch(setActivePage(1));
  };
  return (
    <input
      className="input"
      type="text"
      placeholder="Город"
      value={city}
      onChange={onChange}
    />
  );
};

export default CityFilter;
