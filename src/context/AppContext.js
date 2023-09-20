import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../baseUrl.js";

// step 1 - create the context
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    // state variables
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  // data filling pending from API
  async function fetchBlogPosts(page = 1) {

    setLoading(true);

    let url = `${baseUrl}?page=${page}`;

    // API call
    try {
      const result = await fetch(url);

      // converting into JSON
      const data = await result.json();
      console.log(data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } 
    catch (error) {
        alert("Error in fetching data from API")
        setPage(1);
        setPosts([]);
        setTotalPages(null);
    }

    setLoading(false);

  }

  function handlePageChange(page) {
    setPage(page);
    fetchBlogPosts(page);
  }


  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange
  };

  // step 2 - provide a context value
  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}
