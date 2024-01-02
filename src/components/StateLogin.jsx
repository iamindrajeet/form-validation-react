import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // const emailIsInvalid = didEdit.email && !userData.email.includes("@");
  // const passwordIsInvalid = didEdit.password && !userData.password.trim().length < 6;
  const emailIsInvalid =
    didEdit.email && !isEmail(userData.email) && !isNotEmpty(userData.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(userData.password, 6);



  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserData((prevUserData) => {
      const updatedUserData = {
        ...prevUserData,
        [name]: value,
      };
      return updatedUserData;
    });

    setDidEdit((prevEdit) => {
      return {
        ...prevEdit,
        [target.name]: false,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Stop the default form submission behavior
    console.log(userData);
    setUserData({
      email: "",
      password: "",
    });
  };

  const handleInputBlur = ({ target }) => {
    setDidEdit((prevEdit) => {
      return {
        ...prevEdit,
        [target.name]: true,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleInputBlur}
          onChange={handleChange}
          value={userData.email}
          error={emailIsInvalid && 'Please enter a valid email id'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handleInputBlur}
          onChange={handleChange}
          value={userData.password}
          error={passwordIsInvalid && 'Please enter a valid password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
