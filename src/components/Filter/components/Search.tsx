import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import {
  setSearchValue,
  setActivePage,
} from "../../../redux/slices/filterSlice";

const Search: FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
    dispatch(setActivePage(1));
  };

  return (
    <input
      className="input"
      type="text"
      placeholder="Поиск..."
      value={searchValue}
      onChange={onChange}
    />
  );
};

export default Search;
