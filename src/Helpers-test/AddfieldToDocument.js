/// USed to add an empty tags array to each document in the collection

const xx = async () => {
    const addTagArray = async (id) => {
      const docRef = doc(db,"Questions1test",id)
      // const document = await getDoc(docRef);
      await updateDoc(docRef,{
        tags : arrayUnion(),
      })
    }
    
    
    
    const docRef = collection(db, "Questions1test");
    const response = await getDocs(docRef);

    response.forEach((doc) => addTagArray(doc.id));
  };

  xx();