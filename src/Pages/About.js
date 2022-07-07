import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Blog/Header";
import Contact from "../components/Contact";
import Line from "../components/Home/Line";
import Loader from "../components/Loader";
import AnimatedPage from "../Utils/AnimatedPage";
import { db } from "../Utils/Firebase";

const About = () => {
  const [loader, setloader] = useState(true);

  function closeLoader(params) {
    setloader(false);
  }

  useEffect(() => {
    setTimeout(() => {
      closeLoader();
    }, 2000);
  });

  const [about, aboutF] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "abouts"),

      (snapshot) => {
        let list;

        snapshot.docs.forEach((doc) => {
          list = { id: doc.id, ...doc.data() };
        });

        aboutF(list);
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
    <>
      {loader ? (
        <Loader />
      ) : (
        <AnimatedPage>
          <Header />
          <div className="detail">
            <div className="detailImg">
              <img src={"/about/b.jpg"} alt="author" />
            </div>

            <div className="detailPiece">
              <p>{about.about}</p>
            </div>
            <Link to="/blog">
              <div className="detailGoback">
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: "5px 10px",
                    fontWeight: "500",
                    margin: "10px 0px",
                  }}
                >
                  Go back
                </div>
              </div>
            </Link>
          </div>
          <Line />
          <Contact />
        </AnimatedPage>
      )}
    </>
  );
};

export default About;
