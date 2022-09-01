import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import Bloglist from "./Bloglist";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8000/blogs");
      const data = await res.json();
      return data;
    }

    const db = fetchData();
    console.log(db);
    setBlogs(db);
  }, []);

  return (
    <div className="container-fluid col">
      (blogs && <Bloglist data={blogs} />)
    </div>
  );
};

export default Blogs;
