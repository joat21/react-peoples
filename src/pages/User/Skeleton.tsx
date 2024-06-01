import { FC } from "react";
import ContentLoader from "react-content-loader";
import styles from "./User.module.scss";

const Skeleton: FC = () => (
  <div className={styles["wrapper-skeleton"]}>
    <ContentLoader
      speed={2}
      width={1200}
      height={170}
      viewBox="0 0 1200 170"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="60" cy="55" r="55" />
      <rect x="65" y="170" rx="5" ry="5" width="120" height="15" />
      <rect x="35" y="200" rx="5" ry="5" width="180" height="15" />
      <rect x="50" y="230" rx="5" ry="5" width="150" height="15" />
      <rect x="0" y="120" rx="10" ry="10" width="120" height="45" />
      <rect x="140" y="20" rx="5" ry="5" width="230" height="25" />
      <rect x="380" y="20" rx="5" ry="5" width="230" height="25" />
      <rect x="140" y="70" rx="5" ry="5" width="230" height="25" />
      <rect x="380" y="70" rx="5" ry="5" width="230" height="25" />
      <rect x="140" y="120" rx="5" ry="5" width="470" height="25" />
    </ContentLoader>
  </div>
);

export default Skeleton;
