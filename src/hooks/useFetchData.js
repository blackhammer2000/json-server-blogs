import { useState, useEffect } from "react";

export function useFetchData() {
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [blogsChanged, setBlogsChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogToEditID, setBlogToEditID] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      (async function () {
        try {
          const response = await fetch("http://localhost:8000/blogs");
          if (!response.ok) {
            throw new Error("Server Error, Could not find resources...");
          }
          const data = await response.json();
          if (data) {
            setLoading(false);
            setBlogs(data);
            console.log(data);
            // setIsBlogs(true);
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      })();
    }, 3000);
  }, [blogsChanged]);

  return {
    loading,
    error,
    blogs,
    blogsChanged,
    setBlogsChanged,
    blogToEditID,
    setBlogToEditID,
  };
}
