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
const useGetDocument = ({ document, collection }: Props): ReturnProps => {
  const [result, setResult] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();
  const [isMounted, setIsMounted] = useState(false);
  const fetchDoc = async () => {
    const docRef = doc(db, collection, document);
    setLoading(true);
    if (isMounted)
      await getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setResult(docSnap.data());
            console.log("doc fetched");
            setLoading(false);
          } else {
            console.log("No such document!");
          }
        })
        .catch((err) => {
          setError(err);
        });
  };
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    if (isMounted) fetchDoc();
  }, [isMounted]);

  return [result, loading, error];
};
export default useGetDocument;
