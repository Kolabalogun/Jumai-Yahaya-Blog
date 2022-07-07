import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import Blog from "../Pages/Blog";

import Details from "../Pages/Details";
import Auth from "../Auth/Auth";
import EditBlog from "../Pages/EditBlog";
import About from "../Pages/About";

import { AnimatePresence } from "framer-motion";
import Thoughts from "../Pages/Thoughts";
import Lipgloss from "../Pages/Lipgloss";
import NotFound from "../Pages/NotFound";

const Pages = ({ user, handleLogout, loader }) => {
  // i use this to se the type of page so as to disable link on pages
  const [pageType, pageTypeF] = useState(null);

  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/lipgloss" element={<Lipgloss />} />

        <Route path="/blog" element={<Blog user={user} loader={loader} />} />

        <Route
          path="/createpost"
          element={
            <EditBlog
              user={user}
              handleLogout={handleLogout}
              pageType={pageType}
              pageTypeF={pageTypeF}
            />
          }
        />
        <Route path="/myscribblethoughts" element={<Thoughts />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={
            <Auth
              user={user}
              handleLogout={handleLogout}
              pageType={pageType}
              pageTypeF={pageTypeF}
            />
          }
        />

        <Route path="/detail/:id" element={<Details />} />
        <Route
          path="/update/:id"
          element={
            <EditBlog
              user={user}
              handleLogout={handleLogout}
              pageType={pageType}
              pageTypeF={pageTypeF}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
