import React from "react";
import { Link } from "react-router-dom";

const Content = ({ blogs, handleDelete, user }) => {
  const userId = user?.uid;
  const points = blogs;

  points.sort(function (a, b) {
    return b.dateId - a.dateId;
  });

  return (
    <div className="blog">
      <div className="blogContent">
        {points?.map((blog) => (
          <div className="news" key={blog.dateId}>
            <Link to={`/detail/${blog.id}`}>
              <div className={`newsImg ${blog.category}`}>
                <img src={blog.imgUrl} alt="" />
              </div>
            </Link>
            <div className="bottom">
              <h3 style={{ border: "none" }} className={`${blog.category}`}>
                {blog.title}
              </h3>
              <span>
                {blog.author} - {blog.timestamp.toDate().toDateString()}
              </span>
            </div>
            {userId && blog.userId === user.uid && (
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="bottom edits"
              >
                <Link to={`/update/${blog.id}`}>
                  <button
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      padding: "5px 10px",
                      backgroundColor: "blue",
                      color: "white",
                    }}
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {/* <div className="news ">
          <div className="newsImg d">
            <img src="menu/e.jpg" alt="" />
          </div>
          <div className="bottom">
            <h3 className="colord">A Cup of Me</h3>
            <span>Jumai Yahaya - 28th June, 2022</span>
          </div>
        </div> */}
        {/* <div className="news ">
          <div className="newsImg a">
            <img src="menu/e.jpg" alt="" />
          </div>
          <div className="bottom">
            <h3 className="colora">A Cup of Me</h3>
            <span>Jumai Yahaya - 28th June, 2022</span>
          </div>
        </div>
        <div className="news ">
          <div className="newsImg b">
            <img src="menu/e.jpg" alt="" />
          </div>
          <div className="bottom">
            <h3 className="colorb">A Cup of Me</h3>
            <span>Jumai Yahaya - 28th June, 2022</span>
          </div>
        </div>
        <div className="news ">
          <div className="newsImg c">
            <img src="menu/e.jpg" alt="" />
          </div>
          <div className="bottom">
            <h3 className="colorc">A Cup of Me</h3>
            <span>Jumai Yahaya - 28th June, 2022</span>
          </div>
        </div>
        <div className="news ">
          <div className="newsImg d">
            <img src="menu/e.jpg" alt="" />
          </div>
          <div className="bottom">
            <h3 className="colord">A Cup of Me</h3>
            <span>Jumai Yahaya - 28th June, 2022</span>
          </div>
        </div> */}
        {/* <div className="news ">
          <div className="newsImg a">
            <img src="menu/e.jpg" alt="" />
          </div>
          <div className="bottom">
            <h3 className="colora">A Cup of Me</h3>
            <span>Jumai Yahaya - 28th June, 2022</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Content;
