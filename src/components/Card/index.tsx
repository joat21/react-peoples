import styles from "./Card.module.scss";

const Card = (props) => {
  const { avatar, firstName, lastName, email } = props;
  return (
    <div className={styles.card}>
      <img className={styles.image} src={avatar} alt="alt" />
      <div className={styles.info}>
        <span className={styles["first-name"]}>{firstName}</span>
        <span className={styles["last-name"]}>{lastName}</span>
        <span className={styles.mail}>{email}</span>
      </div>
    </div>
  );
};

export default Card;
