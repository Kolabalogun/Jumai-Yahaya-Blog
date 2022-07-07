import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
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
    <div className="navbarContainer">
      <div className="logo">
        <div className="dot"></div>
        <h1>Jumai Yahaya</h1>
      </div>

      <div className="barNav" style={imgIcon} onClick={navClick}>
        <img
          className="menuNav"
          src={click ? "svg/bars-solid.svg" : "svg/share-square-regular.svg"}
          alt="menu"
        />
      </div>
      <aside style={menu}>
        <Link to="/">
          <div
            style={black}
            onClick={navClick}
            href="/"
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
          <>
            <Link to="/createpost">
              <div
                style={black}
                onClick={navClick}
                href="/blog"
                className="nav-text-sidebar"
              >
                Create Post
              </div>
            </Link>
          </>
        )}
        <Link to="/about">
          <div style={black} onClick={navClick} className="nav-text-sidebar">
            About
          </div>
        </Link>
      </aside>

      <div className="nav" style={navv}>
        <Link to="/">
          <div className="navItems activeNav">Home</div>
        </Link>
        <Link to="/blog">
          <div className="navItems">Blog</div>
        </Link>
        {user ? (
          <>
            <Link to="/createpost">
              <div className="navItems">Create Post</div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/about">
              <div className="navItems">About</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
