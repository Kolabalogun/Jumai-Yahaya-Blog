import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Utils/Firebase";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // to navigate within app
  const navigate = useNavigate();

  // for user login confirmation
  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);
      } else {
        setuser(null);
      }
    });
  }, []);

  //   logging out user
  const handleLogout = () => {
    signOut(auth).then(() => {
      setuser(null);
      navigate("/");
      return toast.error("You've successfully Log Out");
    });
  };

  // i use this to se the type of page so as to disable link on pages
  const [pageType, pageTypeF] = useState(null);

  //   this is for the loader

  const [loader, setloader] = useState(true);

  function closeLoader(params) {
    setloader(false);
  }

  //   to determine the id of the page
  const { id } = useParams();

  return (
    <AppContext.Provider
      value={{
        user,
        setuser,
        handleLogout,
        pageType,
        pageTypeF,
        navigate,
        loader,
        setloader,
        closeLoader,
        id,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
