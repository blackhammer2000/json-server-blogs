import { useState, useEffect } from "react";

export function useFetchData() {
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);
  // const [isBlogs, setIsBlogs] = useState(false);
  const [loading, setLoading] = useState(true);

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
    }, 2000);
  }, []);

  return { loading, error, blogs, setError };
}
