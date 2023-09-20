  import React, { useContext } from "react";
  import Spinner from "./Spinner";
  import { AppContext } from "../context/AppContext";
  import './Blogs.css'

  const Blogs = () => {
    //consume
    const { posts } = useContext(AppContext);
    const {loading } = useContext(AppContext);

    console.log("Printing Inside Blogs Component");

    return (
      <div className="11/12 max-w-[650px] py-3 flex flex-col gap-y-7 mt-[80px] mb-[70px]">
        {loading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <div>
            <p>No Post Found</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <p className="font-bold text-lg">{post.title}</p>
              <p className="text-sm mt-[4px]">
                By <span className="italic">{post.author}</span> on <span className="underline font-bold">{post.category}</span>
              </p>

              <p className="text-sm">
                Posted On {post.date}
              </p>
              
              <p className="text-md mt-[10px]">
                {post.content}
              </p>

              <div className="flex gap-x-2 mt-3">
                {post.tags.map((tag, index) => {
                  return <span key={index} className="text-blue-700 underline font-bold text-xs">{`#${tag}`}</span>;
                })}
              </div>

            </div>
          ))
        )}
      </div>
    );
  };

  export default Blogs;
