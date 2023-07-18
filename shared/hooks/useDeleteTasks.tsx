import { useState } from "react";
import { FirestoreError, doc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  deleteObject,
  ListResult,
  StorageReference,
} from "firebase/storage";
import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
type ReturnProps = [
  (documents: Array<string>) => void,
  boolean,
  FirestoreError | undefined
];
const useDeleteTasks = (): ReturnProps => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | any | undefined>();
  async function deleteDocuments(documents: Array<string>) {
    try {
      setLoading(true);
      const storage = getStorage();
      const deleteDocumentPromises = documents.map(async (document) => {
        console.log("Document getting deleted", document);
        const folderRef = ref(storage, `${user?.uid}/tasks/${document}`);
        const docRef = doc(db, `users/${user?.uid}/tasks`, document);
        await deleteDoc(docRef);
        await deleteFolderContents(folderRef);
      });

      await Promise.all(deleteDocumentPromises);
      setLoading(false);
      router.refresh();
    } catch (err) {
      console.error("Error deleting documents:", err);
      setError(err);
      setLoading(false);
    }
  }
  async function deleteFolderContents(
    folderRef: StorageReference
  ): Promise<void> {
    const listResult: ListResult = await listAll(folderRef);
    const deletePromises: Promise<void>[] = listResult.items.map((itemRef) => {
      return deleteObject(itemRef);
    });
    await Promise.all(deletePromises);
  }
  return [deleteDocuments, loading, error];
};
export default useDeleteTasks;
