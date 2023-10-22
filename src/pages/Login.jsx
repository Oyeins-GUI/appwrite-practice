import { useState } from "react";
import { useUser } from "../lib/context/user";

export default function Login() {
   const user = useUser();
   const [userData, setUserData] = useState({
      email: "",
      password: "",
      name: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevState) => ({ ...prevState, [name]: value }));
   };

   return (
      <section>
         <h1>Login or register</h1>
         <form>
            <input
               type="email"
               placeholder="Email"
               name="email"
               value={userData.email}
               onChange={handleChange}
            />
            <input
               type="password"
               placeholder="Password"
               name="password"
               value={userData.password}
               onChange={handleChange}
            />
            <input
               type="name"
               placeholder="Name"
               name="name"
               value={userData.name}
               onChange={handleChange}
            />
            <div>
               <button
                  className="button"
                  type="button"
                  onClick={() => user.login(userData.email, userData.password)}
               >
                  Login
               </button>
               <button
                  className="button"
                  type="button"
                  onClick={() =>
                     user.register(
                        userData.email,
                        userData.password,
                        userData.name
                     )
                  }
               >
                  Register
               </button>
            </div>
         </form>
      </section>
   );
}
