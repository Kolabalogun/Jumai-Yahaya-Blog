import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Blog/Comment";
import Header from "../components/Blog/Header";
import Contact from "../components/Contact";
import Line from "../components/Home/Line";
import Loader from "../components/Loader";
import AnimatedPage from "../Utils/AnimatedPage";
import { db } from "../Utils/Firebase";

const Details = () => {
  const { id } = useParams();
  const [blog, blogF] = useState(null);

  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    blogF(blogDetail.data());
    setloader(false);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <AnimatedPage>
          <Header />

          <div className="detail">
            <div className="detailHeader">
              <h1>{blog?.title}</h1>
              <p>
                {blog?.author}
                {" - "}
                {blog?.timestamp.toDate().toDateString()}
              </p>
            </div>

            <div className="detailImg">
              <img src={blog?.imgUrl} alt="" />
            </div>

            <div className="detailPiece">
              <p>{blog?.description}</p>
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

          <Comment />

          <Line />

          <Contact />
        </AnimatedPage>
      )}
    </>
  );
};

export default Details;
