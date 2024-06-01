import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAge, setActivePage } from "../../../redux/slices/filterSlice";
import { RootState } from "../../../redux/store";

const AgeFilter: FC = () => {
  const dispatch = useDispatch();
  const age = useSelector((state: RootState) => state.filter.age);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAge({ ...age, [name]: Number(value) }));
    dispatch(setActivePage(1));
  };

  return (
    <div>
      <input
        type="number"
        placeholder="От"
        name="from"
        min={age.from}
        max={age.to}
        value={age.from}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="До"
        name="to"
        min={age.from}
        max={age.to}
        value={age.to}
        onChange={onChange}
      />
    </div>
  );
};

export default AgeFilter;
