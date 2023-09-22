import React, { useEffect } from "react";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import './App.css'
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { findByPlaceholderText } from "@testing-library/react";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import Home from "./Pages/Home";


export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParms] = useSearchParams();
  const location = useLocation();


  useEffect(() => {
    const page = searchParams("page") ?? 1;

    // check if the url contains tags
    if (location.pathname.includes("tags")) {
      // iska matlab tag wala page show krna hai 
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag);
    }
    // check if the url contains categories
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);


  return (
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/blog/:blogId" element = {<BlogPage/>} />
      <Route path="/tags/:tag" element = {<TagPage/>} />
      <Route path="/categories/:category" element = {<CategoryPage/>} />
    </Routes>
  );
}
