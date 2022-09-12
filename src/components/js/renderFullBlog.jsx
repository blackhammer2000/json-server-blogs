import { useFullBlogData } from "../../hooks/useFullBlogData";

export const BlogModal = (id) => {
  const { selectedBlogID, blogs } = useFullBlogData(id);
  const selectedBlog = blogs.find((blog) => blog.id === selectedBlogID);

  return (
    <div className="container">
      <BlogModal blog={selectedBlog} key={selectedBlog.id} />;
    </div>
  );
};
