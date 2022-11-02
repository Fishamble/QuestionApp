import db from "./FirebaseConfig";
import { useEffect } from "react";
import { query, where, getDocs, collection, updateDoc, doc } from "firebase/firestore";

export default function useClearTags() {
  useEffect(() => {
    const getData = async () => {
      const docRef = collection(db, "Questions1test");

      const results = await getDocs(docRef);

      console.log("result ", results);
      console.log("result ", results.docs);

      results.forEach(async (result) => {
        const docRef = doc(db, "Questions1test", result.id);
         await updateDoc(docRef,{tags:[]});
      });

    };
    getData();
  }, []);
}
