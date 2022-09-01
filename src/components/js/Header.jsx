import React from "react";
import "../css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="container row border mt-3">
      <div className="w-50 text-left">
        <h2 className="text-primary font-weight-bold">Blogs</h2>
      </div>
      <ul className="row list-unstyled w-50 justify-content-end">
        <li>
          <button className="btn btn-outline-primary border-0 font-weight-bold">
            HOME
          </button>
        </li>
        <li>
          <button className="btn btn-outline-primary border-0 font-weight-bold">
            BLOGS
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
