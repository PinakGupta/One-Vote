import axios from "axios";
import "../Styles/Login.css";
import { userContext } from "../context.js";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { server } from "../server.js";
import { useDispatch } from "react-redux";
import { setUserId } from "../Redux/slicer.js";

function Login() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'voter';

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  const navigate = useNavigate();
  const { changeVisitorType, updateVisitorId } = useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(`${server}/auth/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Full Response:", response.data);

      const responseData = response?.data?.data;
      if (!responseData) throw new Error("Invalid response structure.");

      // Handle both admin and user
      const userData = responseData.data || responseData;
      const token = responseData.accessToken || responseData.token;
      const userId = userData.user?._id || userData._id;
      const userRole = userData.role || (userData.user && userData.user.role);

      if (!userId || !userRole) throw new Error("User ID or Role missing in response.");

      // Verify the user is logging in with correct role
      if ((role === 'admin' && userRole !== 'admin') || 
          (role === 'voter' && userRole !== 'user')) {
        throw new Error(`Please login through the ${userRole} portal`);
      }

      // Save token & update context + redux
      localStorage.setItem("accessToken", token);
      updateVisitorId(userId);
      dispatch(setUserId(userId));
      changeVisitorType(userRole);

      // Navigate
      navigate(userRole === 'user' ? `/${userId}` : `/admin/${userId}/election`);

      // Reset form
      setData({ email: '', password: '' });
    } catch (error) {
      console.error("Login Error:", error);
      setErr(error.response?.data?.message || error.message || "An error occurred while logging in.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setErr(''), 2000);
    return () => clearTimeout(timer);
  }, [err]);

  return (
    <div id="login">
      {err && <div className="errorField"><p>{err}</p></div>}
      <div className="log">
        <div className="signup-heading flex gap-5 flex-col">
          <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>
            {role === 'admin' ? 'Admin Login' : 'Voter Login'}
          </p>
          <p className="flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">
            Need an Account?
            <Link to="/api/v1/auth/register">
              <span className="login">Register</span>
            </Link>
          </p>
        </div>
        <form className="flex" onSubmit={handleSubmit}>
          <div className="signup-form grid gap-10 sm:grid-cols-2">
            <div className="field email">
              <label htmlFor="email" className="text-lg lg:text-xl xl:text-2xl font-light">
                Enter Email Address
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg font-semibold"
                name="email"
                id="email"
                type="email"
                onChange={handleChange}
                value={data.email}
                placeholder="example@domain.com"
              />
            </div>
            <div className="field password">
              <label htmlFor="password" className="text-lg lg:text-xl xl:text-2xl font-light">
                Enter Password
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg font-semibold"
                name="password"
                id="password"
                type="password"
                onChange={handleChange}
                value={data.password}
              />
              <p className="text-sm sm:text-xl cursor-pointer forget-password">
                <Link to="forget-password">Forget Password?</Link>
              </p>
            </div>
          </div>
          <div className="button flex gap-8">
            <button type="submit" className="text-2xl py-4 px-10">
              <span>Login</span>
            </button>
            <button type="button" className="text-2xl py-4 px-10">
              <Link to="/">
                <span>&lt; Back</span>
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;