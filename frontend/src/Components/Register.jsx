import "../Styles/SignUp.css";
import { useState, useEffect, useContext } from "react";
import React from "react";
import { server } from "../server.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../Redux/slicer.js";
import { userContext } from "../context.js";

function Register() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    role: "user", // Default role
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { changeVisitorType, updateVisitorId } = useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setData({ ...data, avatar: e.target.files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await axios.post(`${server}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          avatar: "",
          role: "user",
        });

        const userData = response?.data?.data;
        changeVisitorType(userData.role || "user");
        localStorage.setItem("accessToken", response.data.cookies?.token || response.data.data.accessToken);
        updateVisitorId(userData._id);
        dispatch(setUserId(userData._id));

        // Navigate based on role
        if (userData.role === "admin") {
          navigate(`/admin/${userData._id}`);
        } else {
          navigate(`/${userData._id}`);
        }
      } else {
        throw new Error("Error while registering a user");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setErr(
        err.response?.data?.message ||
          "Sorry for the inconvenience, we are resolving the issue"
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [err]);

  return (
    <div id="signup">
      {err && (
        <div className="errorField">
          <p>{err}</p>
        </div>
      )}
      <div className="signup">
        <div className="signup-heading flex gap-5 flex-col">
          <p className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold">
            Register
          </p>
          <p className="flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">
            Already Have an Account?
            <Link to="/login">
              <span className="login">Login</span>
            </Link>
          </p>
        </div>
        <form className="flex" onSubmit={handleSubmit}>
          <div className="signup-form grid gap-10 sm:grid-cols-2">
            <div className="field firstName">
              <label
                className="text-2xl 2xl:text-4xl font-light"
                htmlFor="firstName"
              >
                Enter your First Name
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                name="firstName"
                id="firstName"
                type="text"
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </div>
            <div className="field lastName">
              <label
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light"
                htmlFor="lastName"
              >
                Enter your Last Name
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                name="lastName"
                id="lastName"
                required
                type="text"
                onChange={handleChange}
                value={data.lastName}
              />
            </div>
            <div className="field email">
              <label
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light"
                htmlFor="email"
              >
                Enter Email Address
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                name="email"
                id="email"
                type="email"
                required
                onChange={handleChange}
                value={data.email}
                placeholder="example@domain.com"
              />
            </div>
            <div className="field password">
              <label
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light"
                htmlFor="password"
              >
                Create Password
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                name="password"
                id="password"
                required
                type="password"
                onChange={handleChange}
                value={data.password}
              />
            </div>
            <div className="field role">
              <label
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light"
                htmlFor="role"
              >
                Select Role
              </label>
              <select
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                name="role"
                id="role"
                onChange={handleChange}
                value={data.role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="field">
              <label
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light"
                htmlFor="avatar"
              >
                Upload your Avatar
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
                id="avatar"
                name="avatar"
                type="file"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button flex gap-8">
            <button
              type="submit"
              id="button"
              className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
            >
              <span>Register</span>
            </button>
            <button
              type="button"
              id="back"
              className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
            >
              <Link to="/">
                <span>Back</span>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;