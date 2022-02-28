import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionAsync } from "../../redux/collections/collections.actions";
import {
  selectCollectionsForOverview,
  selectIsCollectionsLoaded,
} from "../../redux/collections/collections.selector";
import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";
import { LinearProgress } from "@mui/material";

const ShopPage = ({
  fetchCollections,
  collections,
  isLoading,
  collectionsLoaded,
}) => {
  useEffect(() => {
    if (!collectionsLoaded) fetchCollections();
  }, []);
  return (
    <div>
      {isLoading ? (
        <LinearProgress color="info" />
      ) : (
        Object.keys(collections).map((collection) => (
          <CollectionPreview
            key={collection}
            items={collections[collection]}
            title={collection}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForOverview,
  isLoading: (state) => !selectIsCollectionsLoaded(state),
  collectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: () => dispatch(fetchCollectionAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
