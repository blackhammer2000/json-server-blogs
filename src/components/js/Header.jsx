import React from "react";
import { Link } from "react-router-dom";
import "../css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="container row  mt-3 py-0 justify-content-around align-items-center border-bottom">
      <div className="heading d-flex w-50">
        <h2 className="header  one text-left font-weight-bold">Blogs</h2>
        <h2 className="text-white text-left font-weight-bold">Blogs</h2>
        <h2 className="header two text-left font-weight-bold">Blogs</h2>
      </div>
      <ul className="row list-unstyled w-25 justify-content-around mt-3 ">
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/new">New Blog</CustomLink>
      </ul>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        <h5>{children}</h5>
      </Link>
    </li>
  );
}

export default Header;
