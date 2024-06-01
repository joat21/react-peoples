import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
  return (
    <div className={styles.root}>
      <h2>Страница не найдена</h2>
      <p>
        Скорее всего, это случилось по одной из следующих причин: страница
        переехала, страницы больше нет или Вам просто нравится изучать 404
        страницы
      </p>
      <Link to="/">
        <button className="button">На главную</button>
      </Link>
    </div>
  );
};

export default NotFound;
