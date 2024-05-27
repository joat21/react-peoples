import styles from "./Card.module.scss";

const Card = (props) => {
  const { avatar, firstName, lastName, email } = props;
  return (
    <div className={styles.card}>
      <img src={avatar} alt={`${firstName} ${lastName}`} />
      <div className={styles.info}>
        <span>
          {firstName} {lastName}
        </span>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default Card;
