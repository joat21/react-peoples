import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAge } from "../../../redux/slices/filterSlice";
import { RootState } from "../../../redux/store";
import { useForm } from "react-hook-form";

const AgeFilter: FC = () => {
  const dispatch = useDispatch();
  const age = useSelector((state: RootState) => state.filter.age);

  return (
    <div>
      <input
        type="number"
        placeholder="От"
        onChange={(e) =>
          dispatch(setAge({ ...age, from: Number(e.target.value) }))
        }
      />
      <input
        type="number"
        placeholder="До"
        onChange={(e) =>
          dispatch(setAge({ ...age, to: Number(e.target.value) }))
        }
      />
    </div>
  );
};

export default AgeFilter;
