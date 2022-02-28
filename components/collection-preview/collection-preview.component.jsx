import { CollectionItem } from "../collection-item/collection-item.component";
import styles from "./collection-preview.styles.module.css";
import router from "next/router";

export const CollectionPreview = ({ title, items }) => {
  return (
    <div className="row" style={{ margin: "50px" }}>
      <div className={styles.header}>
        <h3
          className={`${styles.heading} pointable`}
          onClick={() => router.push(`/shop/${title.toLowerCase()}`)}
        >
          {title.toUpperCase()}
        </h3>
      </div>
      {items
        .filter((item, index) => index < 4)
        .map((item) => {
          return <CollectionItem key={item.id} item={item}></CollectionItem>;
        })}
    </div>
  );
};
