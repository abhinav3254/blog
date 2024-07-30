import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import * as AuthService from "../Services/authService";
import "../Styles/signup.scss";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
console.log(name)
    // Use type guard to handle checkbox inputs
    // if (type === "checkbox") {
    //   setFormData({
    //     ...formData,
    //     [name]: (e.target as HTMLInputElement).checked,
    //   });
    // } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    // }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthService.signup(formData)
      .then((res:any) => {
        console.log('res',res);
        localStorage.setItem('userID',res.data.userId)
      })
      .catch((err) => {
        console.log('err',err);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="card flex justify-content-center">
            <FloatLabel>
              <InputText
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="username">Username</label>
            </FloatLabel>{" "}
          </div>
          <div className="card flex justify-content-center">
            {" "}
            <FloatLabel>
              <InputText
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="email">Email</label>
            </FloatLabel>{" "}
          </div>
          <div className="card flex justify-content-center">
            {" "}
            <FloatLabel>
              <InputText
                name="password"
                type="password"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>{" "}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
