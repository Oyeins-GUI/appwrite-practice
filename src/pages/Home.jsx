import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { useState } from "react";

export default function Home() {
   const user = useUser();
   const ideas = useIdeas();

   // console.log(user);

   const [idea, setIdea] = useState({
      title: "",
      description: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setIdea((prevState) => ({ ...prevState, [name]: value }));
   };

   return (
      <>
         {user.current ? (
            <section>
               <h2>Submit Idea</h2>
               <form>
                  <input
                     type="text"
                     placeholder="Title"
                     name="title"
                     value={idea.title}
                     onChange={handleChange}
                  />
                  <textarea
                     placeholder="Description"
                     value={idea.description}
                     name="description"
                     onChange={handleChange}
                  />
                  <button
                     type="button"
                     onClick={() =>
                        ideas.add({
                           userId: user.current.$id,
                           title: idea.title,
                           description: idea.description,
                        })
                     }
                  >
                     Submit
                  </button>
               </form>
            </section>
         ) : (
            <section>
               <p>Please login to submit an idea.</p>
            </section>
         )}
         <section>
            <h2>Latest Ideas</h2>
            <ul>
               {ideas.current.map((idea) => (
                  <li key={idea.$id}>
                     <strong>{idea.title}</strong>
                     <p>{idea.description}</p>
                     {/* Show the remove button to idea owner. */}
                     {user.current && user.current.$id === idea.userId && (
                        <button
                           type="button"
                           onClick={() => ideas.remove(idea.$id)}
                        >
                           Remove
                        </button>
                     )}
                  </li>
               ))}
            </ul>
         </section>
      </>
   );
}
