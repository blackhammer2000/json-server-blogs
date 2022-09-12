import { useState, useEffect } from "react";

export function useFetchData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      (async function () {
        try {
          const response = await fetch("http://localhost:8000/blogs");
          if (!response.ok) {
            throw new Error("Server Error, Could not fnd resources...");
          }
          const data = await response.json();
          if (data) {
            setLoading(false);
            setBlogs(data);
            console.log(data);
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      })();
    }, 2000);
  }, []);

  return { loading, error, blogs };
}
