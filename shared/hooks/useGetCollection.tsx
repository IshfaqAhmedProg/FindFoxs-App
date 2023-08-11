import { useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  Query,
  DocumentData,
  FirestoreError,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
import checkIfObjectExistsInArray from "../functions/checkIfObjectExistsInArray";
import { db } from "@/firebase/config";
import { FilterParams } from "../interfaces/Table";

type ReturnProps = [
  Array<DocumentData>,
  boolean,
  FirestoreError | undefined,
  () => void,
  (sf: FilterParams) => void,
  () => void
];
type Props = {
  queryLimit: number;
  coll: string;
} & (
  | {
      includeAggr: true;
      aggrDoc: string;
    }
  | {
      includeAggr?: false;
      aggrDoc?: never;
    }
);
const useGetCollection = ({
  queryLimit,
  coll,
  includeAggr,
  aggrDoc,
}: Props): ReturnProps => {
  const [isMounted, setIsMounted] = useState(false); //for when the component mounts so that initialFetch runs only once when component mounts and again whenever the filterConstraint changes
  const [results, setResults] = useState<Array<DocumentData>>([]);
  const [lastResult, setLastResult] = useState<DocumentData | null>(null);
  const [endOfData, setEndOfData] = useState<boolean>(false);
  const [filterConstraint, setFilterConstraint] = useState<
    Array<QueryFieldFilterConstraint>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();

  function initialFetch() {
    const q = query(
      collection(db, coll),
      ...filterConstraint,
      orderBy("dateCreated", "desc"),
      limit(queryLimit)
    );
    fetchDocs(q);
  }
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  useEffect(() => {
    if (isMounted) {
      initialFetch();
    }
  }, [isMounted, filterConstraint]);
  function fetchMoreDataFunction() {
    if (lastResult) {
      const q = query(
        collection(db, coll),
        ...filterConstraint,
        orderBy("dateCreated", "desc"),
        limit(queryLimit),
        startAfter(lastResult.dateCreated)
      );
      fetchDocs(q);
    }
  }
  function handleSetFilter(sf: FilterParams) {
    clearAll();
    setFilterConstraint([where(sf.label, "in", sf.value)]);
  }
  function handleClearFilter() {
    clearAll();
    setFilterConstraint([]);
  }
  async function fetchDocs(q: Query<DocumentData>) {
    if (!endOfData) {
      setLoading(true);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        var docs = results;
        var docCount = 0;
        console.log("onSnapshot triggered");
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          if (!checkIfObjectExistsInArray(docs, "_id", doc.data())) {
            docs = [...docs, doc.data()];
          }
          docCount++;
        });
        if (docCount < queryLimit) {
          setEndOfData(true);
        }
        setLastResult(docs[docs.length - 1]);
        setResults(docs);
        setLoading(false);
      });

      // Clean up the listener when the component unmounts or on re-fetch
      return () => {
        unsubscribe();
      };
    }
  }

  async function clearAll() {
    console.log("clearedall");
    setResults([]);
    setLastResult(null);
    setEndOfData(false);
  }
  return [
    results,
    loading,
    error,
    fetchMoreDataFunction,
    handleSetFilter,
    handleClearFilter,
  ];
};

export default useGetCollection;
