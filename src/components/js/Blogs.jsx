import React from "react";
import { useFetchData } from "../../hooks/useFetchData";
import "../css/bootstrap.min.css";
import BlogList from "./BlogList";
import Loader from "./Loader";
import UserData from "./UserData";

const Blogs = () => {
  const {
    loading,
    error,
    blogs,
    blogsChanged,
    setBlogsChanged,
    blogToEditID,
    setBlogToEditID,
    userData,
  } = useFetchData();

  return (
    <div className="container col mt-3">
      {!loading && !blogs && !error && !userData && <UserData />}
      {loading && !blogs && !error && !userData && <Loader />}
      {error && !blogs && <div className="container">{error}</div>}
      {blogs && (
        <BlogList
          blogs={blogs}
          deleteBlog={deleteBlog}
          editBlog={editBlog}
          blogToEditID={blogToEditID}
        />
      )}
    </div>
  );

  function editBlog(id) {
    setBlogToEditID(id);
    // console.log(id);
  }

  async function deleteBlog(id, setError) {
    // Notification.requestPermission().then((permission) => {
    //   console.log(permission);
    // });
    const requestConfigurations = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:8000/blogs/${id}`,
        requestConfigurations
      );
      if (!response.ok) {
        throw new Error("Server Error, Could Not Find Resources To Delete...");
      }

      // const data = await response.json();
      if (response) {
        setBlogsChanged(!blogsChanged);
      }
    } catch (error) {
      setError(error.message);
    }
  }
};

export default Blogs;
