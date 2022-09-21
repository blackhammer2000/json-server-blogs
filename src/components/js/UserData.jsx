import React, { useState } from "react";
import "../css/bootstrap.min.css";

const UserData = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <fieldset className="text-center">
      <legend>Please enter your email to continue</legend>
      <form
        className="form container mt-3"
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
        <div className="form-group container-fluid">
          <button className="btn btn-outline-success w-100">Submit</button>{" "}
        </div>
      </form>
    </fieldset>
  );

  function submitData(e, name, email) {
    e.preventDefault();
    const userData = { name, email };
    let storage = JSON.parse(localStorage.getItem("blogs-user-data"));
    if (storage === null || undefined) {
      localStorage.setItem("blogs-user-data", JSON.stringify(userData));
      setName("");
      setEmail("");
    }
  }
};

export default UserData;
