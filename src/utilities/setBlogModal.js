export const setBlogModal = async (
  id,
  setSelectedBlog,
  blogToEditID,
  editBlog,
  setError
) => {
  //   window.location.pathname = `${window.location.pathname.replace(
  //     "3000",
  //     "8000"
  //   )}${id}`;
  try {
    const res = await fetch(`http://localhost:8000/blogs/${id}`);
    if (!res.ok) throw new Error("Could not find resources");

    const data = await res.json();

    if (!blogToEditID) {
      if (data) {
        setSelectedBlog(data);
        //   console.log(data);
      }
    } else {
      editBlog(id);
      setSelectedBlog(data);
    }
  } catch (error) {
    setError(error.message);
  }
  //   console.log(id);
};
