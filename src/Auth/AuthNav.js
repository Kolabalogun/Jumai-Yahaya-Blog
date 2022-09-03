import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Functions/Context";

const AuthNav = () => {
  const { user, handleLogout, pageType } = useGlobalContext();

  const userId = user?.uid;
  // console.log("userId", userId);
  // console.log("name", user?.displayName);
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

        {user ? (
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
        ) : (
          <>
            <Link to="/auth">
              <div
                style={black}
                onClick={navClick}
                className="nav-text-sidebar"
              >
                Login
              </div>
            </Link>
          </>
        )}

        {userId && (
          <>
            <div className="nav-text-sidebar">{user?.displayName}</div>
            <div
              style={{
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
                border: "none",
              }}
              onClick={handleLogout}
              className="nav-text-sidebar"
            >
              Log Out
            </div>
          </>
        )}
      </aside>

      <div className="nav" style={navv}>
        <Link to="/">
          <div className="navItems ">Home</div>
        </Link>
        <Link to="/blog">
          <div className="navItems">Blog</div>
        </Link>
        {user ? (
          <>
            {pageType === "editBlog" ? (
              ""
            ) : (
              <Link to="/createpost">
                <div className="navItems">Create Post</div>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/auth">
              <div className="navItems">Login</div>
            </Link>
          </>
        )}
        {userId && (
          <>
            <div className="navItems" style={{ display: "flex" }}>
              <div className="profileLogo">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="logo"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </div>
              <p style={{ paddingLeft: "10px" }}>{user?.displayName}</p>
            </div>
            <div
              className="navItems "
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                paddingTop: "2px",
                cursor: "pointer",
              }}
            >
              Log Out
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthNav;
