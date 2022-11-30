import { useState, useEffect } from "react";

export function useFetchData() {
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [reactions, setReactions] = useState(null);
  const [blogsChanged, setBlogsChanged] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogToEditID, setBlogToEditID] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const userInfo = JSON.parse(localStorage.getItem("blogs-user-data"));
      if (userInfo) {
        (async function () {
          try {
            const response = await fetch(
              "http://localhost:4000/api/read/blogs",
              {
                method: "GET",
                mode: "cors",
              }
            );

            // console.log(response);

            if (!response.ok) {
              throw new Error("Server Error, Could not find resources...");
            }

            const data = await response.json();

            if (data) {
              setUserData(userInfo);
              setLoading(false);
              setBlogs(data.blogs);
              console.log(data.blogs);
              // setIsBlogs(true);
            }
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        })();
      } else {
        setLoading(false);
      }
    }, 5000);
  }, [blogsChanged, reactions]);

  return {
    loading,
    error,
    blogs,
    blogsChanged,
    setBlogsChanged,
    blogToEditID,
    setBlogToEditID,
    userData,
    setUserData,
  };
}
