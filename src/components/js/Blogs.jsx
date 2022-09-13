import React from "react";
import { useFetchData } from "../../hooks/useFetchData";
import "../css/bootstrap.min.css";
import BlogList from "./BlogList";
import Loader from "./Loader";

const Blogs = () => {
  const { loading, error, blogs, setError } = useFetchData();
  return (
    <div className="container col mt-3">
      {loading && !blogs && !error && <Loader />}
      {error && !blogs && <div className="container">{error}</div>}
      {blogs && <BlogList blogs={blogs} setError={setError} />}
    </div>
  );
};

export default Blogs;
