import React from "react";
import { useFetchData } from "../../hooks/useFetchData";
import "../css/bootstrap.min.css";
import BlogList from "./BlogList";
import Loader from "./Loader";

const Blogs = () => {
  const { loading, error, blogs, setBlogs } = useFetchData();
  return (
    <div className="container col mt-3">
      {loading && !blogs && !error && <Loader />}
      {error && !blogs && <div className="container">{error}</div>}
      {blogs && <BlogList blogs={blogs} deleteBlog={deleteBlog} />}
    </div>
  );

  async function deleteBlog(id, setError) {
    const requestConfigurations = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:8000/${id}`,
        requestConfigurations
      );
      if (!response.ok) {
        throw new Error("Server Error, Could Not Find Resources...");
      }

      const data = await response.json();
      if (data) {
        setBlogs(
          blogs.map((blog) => {
            if (blog.id === id) return null;
            return blog;
          })
        );
      }
    } catch (error) {
      setError(error.message);
    }
  }
};

export default Blogs;
