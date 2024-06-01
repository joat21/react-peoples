import { FC } from "react";
import styles from "./Card.module.scss";

type CardProps = {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
};

const Card: FC<CardProps> = (props: CardProps) => {
  const { avatar, firstName, lastName, email, age, city } = props;
  return (
    <div className={styles.card}>
      <img src={avatar} alt={`${firstName} ${lastName}`} />
      <div className={styles.info}>
        <span>
          {firstName} {lastName}
        </span>
        <span>{email}</span>
        <span>
          {city}, {age} лет
        </span>
      </div>
    </div>
  );
};

export default Card;
