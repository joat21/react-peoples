import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { setIsAuthorized } from "../../../redux/slices/currentUserSlice";

import styles from "../Header.module.scss";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div className={styles.profile}>
      <Link to={`/user/${user?.id}`} state={user}>
        <img src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
      </Link>
      <button
        className={`button ${styles.btn}`}
        onClick={() => {
          dispatch(setIsAuthorized(false));
          navigate("/registration");
          localStorage.clear();
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default Profile;
