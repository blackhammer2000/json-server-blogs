import React, { useState } from "react";
import "../css/bootstrap.min.css";

const UserData = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <form
      className="form container"
      onSubmit={(e) => {
        submitData(e, name, email);
      }}
    >
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-success">Submit</button>{" "}
      </div>
    </form>
  );

  function submitData(e, name, email) {
    e.preventDefault();
    const userData = { name, email };
    let storage = JSON.parse(localStorage.getItem("blogs-user-data")) || {};
    if (!storage) {
      storage = userData;
      localStorage.setItem("blogs-user-data", JSON.stringify(userData));
    }
  }
};

export default UserData;
