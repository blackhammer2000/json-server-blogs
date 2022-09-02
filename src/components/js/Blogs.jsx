import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import Bloglist from "./Bloglist";

const Blogs = () => {
  const [blogs] = useState(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8000/blogs");
      const data = await res.json();
      return data;
    }

    const db = fetchData();
    return db;
  });

  // useEffect(() => {
  //   console.log(db);
  //   setBlogs(db);
  // }, []);

  return (
    <div className="container-fluid col">
      (blogs && <Bloglist blogs={blogs} />)
    </div>
  );
};

export default Blogs;
