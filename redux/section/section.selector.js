import { createSelector } from "reselect";

const _selectSections = (state) => state.sections;

export const selectSections = createSelector(
  [_selectSections],
  (sections) => sections.collections
);

export const selectIsSectionsFetching = createSelector(
  [_selectSections],
  (sections) => sections.isFetching
);

export const selectIsSectionsLoaded = createSelector(
  [_selectSections],
  (sections) => !!sections.collections
);

export const selectSectionFetchError = createSelector(
  [_selectSections],
  (sections) => sections.error
);
