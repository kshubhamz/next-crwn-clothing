import { Collection } from "../../components/collection/collection.component";

const ShowCollection = ({ collectionName }) => {
  return <Collection collectionName={collectionName} />;
};

ShowCollection.getInitialProps = (context) => ({
  collectionName: context.query.collection,
});

export default ShowCollection;
