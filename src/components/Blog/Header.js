import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  const [click, clickF] = React.useState(true);
  const [showNav, showNavF] = React.useState(true);

  function navClick(params) {
    clickF((prevState) => !prevState);
  }

  const showMenuBtn = () => {
    if (window.innerWidth > 900) {
      showNavF(true);
      clickF(true);
    } else {
      showNavF(false);
      // clickF(false);
    }
  };

  React.useEffect(() => {
    showMenuBtn();
  }, []);

  window.addEventListener("resize", showMenuBtn);

  const imgIcon = {
    display: showNav ? "none" : "flex",
  };
  const navv = {
    display: showNav ? "flex" : "none",
  };
  const menu = {
    display: click ? "none" : "block",
  };
  const black = {
    color: "black",
  };
  return (
    <div className="blogheader">
      <div className="barNav" style={imgIcon} onClick={navClick}>
        <img
          className="menuNav"
          src={click ? "/svg/bars-solid.svg" : "/svg/share-square-regular.svg"}
          style={{ top: "0px" }}
          alt="menu"
        />
      </div>
      <aside style={menu}>
        <Link to="/">
          <div
            style={black}
            onClick={navClick}
            className="nav-text-sidebar top"
          >
            Home
          </div>
        </Link>
        <Link to="/blog">
          <div style={black} onClick={navClick} className="nav-text-sidebar">
            Blog
          </div>
        </Link>

        {user && (
          <Link to="/createpost">
            <div style={black} onClick={navClick} className="nav-text-sidebar">
              Create Post
            </div>
          </Link>
        )}
        <Link to="/about">
          <div style={black} onClick={navClick} className="nav-text-sidebar">
            About
          </div>
        </Link>
      </aside>

      <div className="header">
        <Link to="/">
          <div className="navItems blognav">Home</div>
        </Link>
        <Link to="/blog">
          <div className="logoBlog ">
            <img src="/logo/1.png" alt="BlogLogo" />
          </div>
        </Link>

        {user ? (
          <Link to="/createpost">
            <div className="navItems blognav">Create Post</div>
          </Link>
        ) : (
          <Link to="/about">
            <div href="contact">
              <div className="navItems blognav">About</div>
            </div>
          </Link>
        )}
      </div>
      {/* <div className="titleBlogCaption">
        <p>
          {"=== "}A cup of me {"==="}
        </p>
      </div> */}
    </div>
  );
};

export default Header;
