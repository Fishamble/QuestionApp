import { useEffect, useState } from "react";
import db from "./FirebaseConfig";
import { query, where, getDocs, collection } from "firebase/firestore";

export default function useFetchSearch() {
  // const { searchTerm } = useContext(tagsContext);

  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    const getData = async () => {
      const ref = collection(db, "Questions1test");

      

      const q = query(ref, where("tags", "array-contains", "OOP"));

      const result = await getDocs(q);
      setSearchResult(result.docs);
    };
    getData();
  }, []);

  return searchResult;
}
