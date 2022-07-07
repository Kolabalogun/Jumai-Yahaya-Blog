import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Contact from "../components/Contact";

import Caption from "../components/Home/Caption";
import Line from "../components/Home/Line";
import Menu from "../components/Home/Menu";
import Navbar from "../components/Home/Navbar";
import Loader from "../components/Loader";
import AnimatedPage from "../Utils/AnimatedPage";
import { db } from "../Utils/Firebase";

const Home = ({ user }) => {
  const [loader, setloader] = useState(true);

  function closeLoader(params) {
    setloader(false);
  }

  useEffect(() => {
    setTimeout(() => {
      closeLoader();
    }, 2000);
  });

  const [note, noteF] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),

      (snapshot) => {
        let list;

        snapshot.docs.forEach((doc) => {
          list = { id: doc.id, ...doc.data() };
        });

        noteF(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <AnimatedPage>
          <Navbar user={user} />
          <Caption />
          <Line />
          <Menu />
          <div className="quote">
            <div>
              <h2>{note.note}</h2>
              <p>— A cup of me, Jumai.</p>
            </div>
          </div>
          <Line />
          <div id="contact">
            <Contact />
          </div>
          {/* <Footer /> */}
        </AnimatedPage>
      )}
    </div>
  );
};

export default Home;
