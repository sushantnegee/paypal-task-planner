import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({children}) => {
  const [user, setUser] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);
  const [sprints,setSprints] = useState([{
    "name": "Sprint 1",
    "startDate": "2023-04-01",
    "endDate": "2023-03-05"
  },{
    "name": "Sprint 2",
    "startDate": "2023-04-01",
    "endDate": ""
  },{
    "name": "Sprint 3",
    "startDate": "2023-04-01",
    "endDate": "2023-03-05"
  }]);
  const [selectedSprint,setSelectedSprint] = useState()

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
        setSprints,
        selectedSprint,
        setSelectedSprint
    }}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextProvider;