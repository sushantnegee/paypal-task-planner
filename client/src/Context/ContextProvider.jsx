import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({children}) => {
  const [user, setUser] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);
  const [sprints,setSprints] = useState('');

  useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      if (!userInfo){
        
      }
  },[loggedIn])
  console.log("context")

  return (
    <AppContext.Provider value={{
        user,
        setUser,
        setLoggedIn,
        sprints,
        setSprints
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextProvider;