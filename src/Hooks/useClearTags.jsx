import db from "./FirebaseConfig";
import { useEffect } from "react";
import {  getDocs, collection, updateDoc, doc } from "firebase/firestore";



//hook written for a single use. resets the tags array to empty for all docs in collection 

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
