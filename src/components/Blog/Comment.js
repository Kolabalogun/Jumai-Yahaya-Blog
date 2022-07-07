import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../Utils/Firebase";

const Comment = () => {
  const { id } = useParams();

  const commentTime = new Date().toDateString();
  const dateId = new Date().getTime();
  // console.log(commentTime);

  const [form, setform] = useState("");
  const [comment, commentF] = useState({
    name: "",
    commentTxt: "",
    commentTime: commentTime,
    dateId: dateId,
  });

  const { name, commentTxt } = comment;

  const handleChange = (e) => {
    commentF((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // for update Blog

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setform({ ...snapshot.data() });
    }
  };

  //hhdhd
  const updateComment = async (e) => {
    e.preventDefault();

    if (name && commentTxt) {
      // if we adding new blog

      try {
        await updateDoc(doc(db, "blogs", id), {
          ...form,
          comment: arrayUnion(comment),
          // dateId: dateId,
        });
        toast.success("Comment uploaded");
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("All fields must be filled");
    }
    window.location.reload();
  };

  //   receiving comments from Firebase

  const [storedComments, storedCommentsF] = useState([
    { name: "", commentTxt: "" },
  ]);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    storedCommentsF(blogDetail.data().comment);
  };

  const points = storedComments;

  points.sort(function (a, b) {
    return b.dateId - a.dateId;
  });

  // console.log("storedcomments", storedComments);

  function GetComments(params) {
    if (points.length > 0) {
      const hh = points.map((com, index) => {
        return (
          <div key={index} className="eachComment">
            <div className="topp">
              <div className="icon">
                <img src="/logo/JY.png" alt="" />
              </div>
              <div className="name">
                <h4>{com.name}</h4>
                <span>{com.commentTime}</span>
              </div>
            </div>

            <div className="commentTxt">{com.commentTxt}</div>
            <hr />
          </div>
        );
      });

      return hh;
    }
  }

  return (
    <div className="commentSection">
      <div className="comment">
        <h6 style={{ fontWeight: "500" }}>Post a comment</h6>
        <div className="commentsSection">
          <span style={{ fontSize: "14px" }}>{points.length} Comment(s)</span>
          {points && <GetComments />}
        </div>
      </div>

      <div className="commentForm">
        <form>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            placeholder="Your name..."
          />
          <textarea
            rows="4"
            name="commentTxt"
            onChange={handleChange}
            value={commentTxt}
            placeholder="Enter your comments here"
          />
          <button onClick={updateComment}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
