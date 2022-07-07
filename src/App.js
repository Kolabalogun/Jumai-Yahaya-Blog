import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
// import "react-toastify/dist/react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { auth } from "./Utils/Firebase";

import Pages from "./Functions/Pages";

function App() {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);

  // const [loader, setloader] = useState(true);

  // function closeLoader(params) {
  //   setloader(false);
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     closeLoader();
  //   }, 1000);
  // });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);
      } else {
        setuser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setuser(null);
      navigate("/");
      return toast.error("You've successfully Log Out");
    });
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />

      <Pages user={user} handleLogout={handleLogout} />
    </div>
  );
}

export default App;
