import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Content from "../components/Blog/Content";
import Header from "../components/Blog/Header";
import Contact from "../components/Contact";
import Line from "../components/Home/Line";
import Loader from "../components/Loader";
import AnimatedPage from "../Utils/AnimatedPage";
import { db } from "../Utils/Firebase";

const Blog = ({ user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blogs, blogsF] = useState([]);

  const [loader, setloader] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     closeLoader();
  //   }, 2000);
  // }, []);

  useEffect(() => {
    setloader(true);
    const unsub = onSnapshot(
      collection(db, "blogs"),

      (snapshot) => {
        let list = [];

        console.log(loader);
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        blogsF(list);
        setloader(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        setloader(true);
        await deleteDoc(doc(db, "blogs", id));
        setloader(false);
        toast.error("Blog successfully deleted");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(blogs);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <AnimatedPage>
          <div className="blogContainer">
            <Header user={user} />
            <Content blogs={blogs} handleDelete={handleDelete} user={user} />
            <Line />
            <div id="contact">
              <Contact />
            </div>
          </div>
        </AnimatedPage>
      )}
    </>
  );
};

export default Blog;
