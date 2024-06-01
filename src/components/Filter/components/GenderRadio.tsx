import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { setGender } from "../../../redux/slices/filterSlice";

import { Gender } from "../../../entities/model";

import styles from "../Filter.module.scss";

const genders = [
  { label: "Любой", value: "any" },
  { label: "Мужской", value: Gender.MALE },
  { label: "Женский", value: Gender.FEMALE },
];

const GenderRadio: FC = () => {
  const dispatch = useDispatch();
  const gender = useSelector((state: RootState) => state.filter.gender);

  return (
    <div className={styles.gender}>
      Пол
      {genders.map((item) => (
        <label key={item.value}>
          <input
            type="radio"
            name="gender"
            value={item.value}
            onChange={(e) => dispatch(setGender(e.target.value))}
            checked={item.value === gender}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default GenderRadio;
