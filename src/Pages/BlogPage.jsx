import React from 'react'
import Header from '../components/Header'
import { useNavigation } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function BlogPage() {

  const [blog, setBlog] = useState(null);  
  const [relatedblogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigation();

  const {setLoading, loading} = useContext(AppContext);
  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${baseUrl}?blogId=${blog._id}`;   

    try {
      const result = await fetch(url);
      const data = await result.json();

      console.log(data);

      setBlog(data.blog);
      setRelatedBlogs(data.relatedblogs);

    } catch (error) {
      alert("Error in fetching data from API");
      setBlog(null);
      setRelatedBlogs([]);
    }

    setLoading(false);
  }

  useEffect( () => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]) 

  return (
    <div>
      <Header/>

      <div>
        <button onClick={() => navigation(-1)}>
          Back
        </button>
      </div>

      {
        loading ? <Spinner/> : 
        blog ? (<div>
          <BlogDetails post={blog} />
          <h2>Related Blogs</h2>
          {
            relatedblogs.map( (post) => (
              <div>
                <BlogDetails post={post}/>
              </div>
            ))
          }
        </div>) : 
        (<p>No Blogs Found</p>)
      }



    </div>
  )
}

export default BlogPage