import React from "react";
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

const Pages = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/lipgloss" element={<Lipgloss />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/createpost" element={<EditBlog />} />
        <Route path="/myscribblethoughts" element={<Thoughts />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/detail/:id" element={<Details />} />
        <Route path="/update/:id" element={<EditBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
