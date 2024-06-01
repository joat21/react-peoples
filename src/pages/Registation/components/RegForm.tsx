import { ChangeEvent, FC, FormEvent } from "react";
import { RegData, Gender } from "../../../entities/model";

type RegFormProps = {
  onSubmit: (e: FormEvent) => void;
  regData: RegData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RegForm: FC<RegFormProps> = (props: RegFormProps) => {
  const { onSubmit, regData, onChange } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <input
          type="text"
          placeholder="Имя*"
          name="firstName"
          value={regData.firstName}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Фамилия*"
          name="lastName"
          value={regData.lastName}
          onChange={onChange}
          required
        />
      </div>
      <div className="row">
        <div className="row">
          <label>
            <input
              type="radio"
              name="gender"
              value={Gender.MALE}
              onChange={onChange}
              checked={regData.gender === Gender.MALE}
            />
            Мужчина
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value={Gender.FEMALE}
              onChange={onChange}
              checked={regData.gender === Gender.FEMALE}
            />
            Женщина
          </label>
        </div>
        <input
          type="number"
          placeholder="Возраст*"
          name="age"
          min={14}
          value={regData.age === 0 ? "" : regData.age}
          onChange={onChange}
          required
        />
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="Ссылка на аватарку"
          name="avatar"
          value={regData.avatar}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Город"
          name="avatar"
          value={regData.avatar}
          onChange={onChange}
        />
      </div>
      <input
        type="text"
        placeholder="Email*"
        name="email"
        value={regData.email}
        onChange={onChange}
        required
      />
      <input
        type="password"
        placeholder="Пароль*"
        name="password"
        value={regData.password}
        onChange={onChange}
        required
      />
      <button className="button" type="submit">
        Создать аккаунт
      </button>
    </form>
  );
};

export default RegForm;
