import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCollectionAsync } from "../../redux/collections/collections.actions";
import {
  selectCollection,
  selectIsCollectionsLoaded,
} from "../../redux/collections/collections.selector";
import { CollectionItem } from "../collection-item/collection-item.component";
import styles from "./collection.styles.module.css";

const convertToTitleCase = (txt) =>
  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

const _Collection = ({
  collection,
  collectionsLoaded,
  fetchCollection,
  collectionName,
}) => {
  useEffect(() => {
    if (!collectionsLoaded) fetchCollection();
  }, []);
  return !collectionsLoaded ? (
    <LinearProgress color="info" />
  ) : collection ? (
    <div className={styles.shop_category}>
      <h2 className={styles.title}>{collectionName.toUpperCase()}</h2>
      <div className={`row ${styles.items}`}>
        {collection.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  ) : (
    <h3 style={{ textAlign: "center" }}>
      There aren't any product under collection {collectionName}.
    </h3>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollection: () => dispatch(fetchCollectionAsync()),
});

const mapStateToProps = (state, ownProps) => {
  return {
    collection: selectCollection(
      convertToTitleCase(ownProps["collectionName"])
    )(state),
    collectionsLoaded: selectIsCollectionsLoaded(state),
    collectionName: ownProps["collectionName"],
  };
};

export const Collection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Collection);
