import { useState, useEffect } from "react";
import { useFetchData } from "./useFetchData";

export const useFullBlogData = ({ id }) => {
  //   const { blogs } = useFetchData();
  const [selectedBlogID, setSelectedBlogID] = useState(null);
  //   const [ID, dispatch] = useReducer(reducer, initialArg, init);

  //   useEffect(() => {
  //     blogs.find((blog) => {
  //       return blog.id === id ? setSelectedBlogID(blog.id) : null;
  //     });
  //   }, [id, blogs]);

  return { selectedBlogID, setSelectedBlogID };
};
