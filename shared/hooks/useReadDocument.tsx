import { useState, useEffect } from "react";
import { DocumentData, FirestoreError, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
interface Props {
  document: string;
  collection: string;
}
type ReturnProps = [
  DocumentData | undefined,
  boolean,
  FirestoreError | undefined
];
const useReadDocument = ({ document, collection }: Props): ReturnProps => {
  const [result, setResult] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();
  useEffect(() => {
    const subscribe = async () => {
      const docRef = doc(db, collection, document);
      setLoading(true);
      console.log("doc fetched");
      await getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setResult(docSnap.data());
            setLoading(false);
          } else {
            console.log("No such document!");
          }
        })
        .catch((err) => {
          setError(err);
        });
    };

    return () => {
      subscribe();
    };
  }, []);

  return [result, loading, error];
};
export default useReadDocument;
