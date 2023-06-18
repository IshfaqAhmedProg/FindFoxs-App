import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentData, FirestoreError, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
interface Props {
  document: string;
  collection: string;
}
const useFirestoreDocument = ({
  document,
  collection,
}: Props): [DocumentData | undefined, boolean, FirestoreError | undefined] => {
  const docRef = doc(db, collection, document);
  const [value, loading, error, snapshot] =
    useDocumentData<DocumentData>(docRef);
  return [value, loading, error];
};
export default useFirestoreDocument;
