import { createSelector } from "reselect";

const _selectCollections = (state) => state.collections;

export const selectCollectionsForOverview = createSelector(
  [_selectCollections],
  (collections) => (collections.collections ? collections.collections : null)
);

export const selectCollectionsFetchError = createSelector(
  [_selectCollections],
  (collections) => collections.error
);

export const selectIsCollectionsLoaded = createSelector(
  [_selectCollections],
  (collections) => !!collections.collections
);

export const selectCollection = (collection) =>
  createSelector([_selectCollections], (collections) =>
    collections.collections ? collections.collections[collection] : null
  );
