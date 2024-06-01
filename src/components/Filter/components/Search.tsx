import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { setSearchValue } from "../../../redux/slices/filterSlice";

const Search: FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );
  return (
    <input
      className="input"
      type="text"
      placeholder="Поиск..."
      value={searchValue}
      onChange={(e) => dispatch(setSearchValue(e.target.value))}
    />
  );
};

export default Search;
