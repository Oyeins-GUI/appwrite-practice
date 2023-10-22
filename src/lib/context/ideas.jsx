import { createContext, useEffect, useState, useContext } from "react";
import { databases } from "../../appwriteConfig";
import { ID, Query, Permission, Role } from "appwrite";

export const IDEAS_DATABASE_ID = "ideas-tracker";
export const IDEAS_COLLECTION_ID = "ideas-tracker";

const IdeasContext = createContext();

export function useIdeas() {
   return useContext(IdeasContext);
}

export function IdeasProvider({ children }) {
   const [ideas, setIdeas] = useState([]);

   async function add(idea) {
      const response = await databases.createDocument(
         IDEAS_DATABASE_ID,
         IDEAS_COLLECTION_ID,
         ID.unique(),
         idea,
         [Permission.write(Role.any())]
      );
      setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
      window.location.reload();
   }

   async function remove(id) {
      await databases.deleteDocument(
         IDEAS_DATABASE_ID,
         IDEAS_COLLECTION_ID,
         id
      );
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
   }

   async function init() {
      const response = await databases.listDocuments(
         IDEAS_DATABASE_ID,
         IDEAS_COLLECTION_ID,
         [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents);
   }

   useEffect(() => {
      init();
   }, []);

   return (
      <IdeasContext.Provider value={{ current: ideas, add, remove }}>
         {children}
      </IdeasContext.Provider>
   );
}
