export const setBlogModal = async (id, setSelectedBlog, setError) => {
  try {
    const res = await fetch(`http://localhost:8000/blogss/${id}`);
    if (!res.ok) throw new Error("Could not find resources");
    const data = await res.json();

    if (data) {
      setSelectedBlog(data);
    }
  } catch (error) {
    setError(error.message);
  }
  //   console.log(id);
};
