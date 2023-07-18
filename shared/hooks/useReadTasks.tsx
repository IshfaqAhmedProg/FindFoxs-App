import { useState, useEffect } from "react";
import {
  getDocs,
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
import Task from "../interfaces/Tasks";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/config";
import { Filter } from "../interfaces/Table";

type ReturnProps = [
  Array<Task>,
  boolean,
  FirestoreError | undefined,
  () => void,
  (sf: Filter) => void,
  () => void
];

const useReadTasks = ({ queryLimit }: { queryLimit: number }): ReturnProps => {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false); //for when the component mounts so that initialFetch runs only once when component mounts and again whenever the filterConstraint changes
  const [results, setResults] = useState<Array<Task>>([]);
  const [lastResult, setLastResult] = useState<Task | null>(null);
  const [endOfData, setEndOfData] = useState<boolean>(false);
  const [filterConstraint, setFilterConstraint] = useState<
    Array<QueryFieldFilterConstraint>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined>();

  function initialFetch(uid?: string) {
    const q = query(
      collection(db, `users/${uid ?? user?.uid}/tasks`),
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
    if (isMounted && user?.uid) {
      initialFetch(user.uid);
    }
  }, [isMounted, user?.uid, filterConstraint]);
  function fetchMoreTasksFunction() {
    if (lastResult) {
      const q = query(
        collection(db, `users/${user?.uid}/tasks`),
        ...filterConstraint,
        orderBy("dateCreated", "desc"),
        limit(queryLimit),
        startAfter(lastResult.dateCreated)
      );
      fetchDocs(q);
    }
  }
  function handleSetFilter(sf: Filter) {
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
      var docs = results;
      var docCount = 0;
      console.log("getdocs called");
      await getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            if (!checkIfObjectExistsInArray(docs, "_id", doc.data())) {
              docs = [...docs, doc.data() as Task];
            }
            docCount++;
          });
          if (docCount < queryLimit) {
            setEndOfData(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        })
        .finally(() => {
          setLastResult(docs[docs.length - 1]);
          setResults(docs);
          setLoading(false);
        });
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
    fetchMoreTasksFunction,
    handleSetFilter,
    handleClearFilter,
  ];
};

export default useReadTasks;
