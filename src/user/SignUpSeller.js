import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signupSeller } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    companyname: "",
    email: "",
    phonenum: "",
    address: "",
    error: "",
    success: false,
  });

  const { companyname, email, phonenum, address, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };    

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signupSeller({ companyname, email, phonenum, address }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          companyname: "",
          email: "",
          phonenum: "",
          address: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Company Name</label>
        <input
          onChange={handleChange("companyname")}
          type="text"
          className="form-control"
          value={companyname}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Address</label>
        <input
          onChange={handleChange("address")}
          type="text"
          className="form-control"
          value={address}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Mobile No</label>
        <input
          onChange={handleChange("phonenum")}
          type="text"
          className="form-control"
          value={phonenum}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
