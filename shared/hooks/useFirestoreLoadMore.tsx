import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  Query,
  DocumentData,
  WhereFilterOp,
  OrderByDirection,
  FirestoreError,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
interface Props {
  collectionString: string;
  whereObject: { fieldPath: string; opStr: WhereFilterOp; value: unknown };
  orderByObject: { fieldPath: string; order: OrderByDirection };
  fetchSize: number;
}
const useFirestoreCollection = ({
  collectionString,
  whereObject,
  orderByObject,
  fetchSize,
}: Props): [
  Array<DocumentData> | undefined,
  boolean,
  FirestoreError | undefined,
  () => void
] => {
  const [queryCall, setQueryCall] = useState<Query<DocumentData> | null>(null);
  const [results, setResults] = useState<Array<DocumentData>>([]);
  const [lastData, setLastData] = useState<any>();
  const [docs, loading, error] = useCollectionData(queryCall);
  console.log("docs", docs);
  console.log("lastData", lastData);
  useEffect(() => {
    if (!queryCall) {
      // Initial query
      const initialQueryCall = query(
        collection(db, collectionString),
        where(whereObject.fieldPath, whereObject.opStr, whereObject.value),
        orderBy(orderByObject.fieldPath, orderByObject.order),
        limit(fetchSize)
      );
      setQueryCall(initialQueryCall);
    }
  }, []);

  const fetchDataFunction = () => {
    console.log("lastData", lastData);
    if (lastData && docs && docs.length === fetchSize) {
      const newQueryCall = query(
        collection(db, collectionString),
        where("uid", "==", auth.currentUser?.uid),
        orderBy("dateCreated", "desc"),
        startAfter(lastData.dateCreated),
        limit(fetchSize)
      );
      setQueryCall(newQueryCall);
    }
  };

  useEffect(() => {
    if (docs) {
      if (docs.length === 0) {
        // All tasks have been fetched
        console.log("All items have been fetched");
      } else {
        // Update lastData
        const lastItem = docs[docs.length - 1];
        if (lastItem) {
          setLastData(lastItem);
        }
      }
    }
  }, [docs]);
  useEffect(() => {
    if (docs) {
      setResults(results.concat(docs));
    }
  }, [docs]);
  return [results, loading, error, fetchDataFunction];
};

export default useFirestoreCollection;
