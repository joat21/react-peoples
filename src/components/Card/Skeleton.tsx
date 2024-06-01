import { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={280}
    viewBox="0 0 250 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="65" r="55" />
    <rect x="65" y="170" rx="5" ry="5" width="120" height="15" />
    <rect x="35" y="200" rx="5" ry="5" width="180" height="15" />
    <rect x="50" y="230" rx="5" ry="5" width="150" height="15" />
  </ContentLoader>
);

export default Skeleton;
