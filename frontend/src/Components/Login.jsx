

// // import api from "../axiosInstance.js"
// // import axios from "axios"
// // import "../Styles/Login.css"
// // import { userContext } from "../context.js"
// // import { useState, useEffect, useContext } from "react"
// // import React from 'react'
// // import { Link, useNavigate } from "react-router-dom"
// // import { server } from "../server.js"
// // import { useDispatch } from "react-redux"
// // import { setUserId } from "../Redux/slicer.js"

// // function Login() {
// //    const dispatch = useDispatch()
// //    const [data, setData] = useState({
// //       uniqueId: '',
// //       password: '',
// //    })
// //    const [err, setErr] = useState('')


// //    const handleChange = (e) => {
// //       const { name, value } = e.target;
// //       setData({ ...data, [name]: value })
// //    }

// //    const navigate = useNavigate()
// //    const { visitorType, changeVisitorType } = useContext(userContext)
// //    const { visitorId, updateVisitorId } = useContext(userContext)

// //    const handleSubmit = async (e) => {
// //       e.preventDefault();
// //       try {
// //          const user = {
// //             uniqueId: data.uniqueId,
// //             password: data.password
// //          }
// //          const response = await axios.post(`${server}/auth/login`, user, {
// //             headers: {
// //                "Content-Type": "application/json"
// //             }
// //          })
// //          localStorage.setItem("accessToken", response.data.data.accessToken)
// //          if (response.status === 200) {
// //             updateVisitorId(response.data.data.user._id)
// //             dispatch(setUserId(response.data.data.user._id))
// //             if (response.data.data.user.role === 'user') {
// //                changeVisitorType('user')
               
// //                navigate(`/${response.data.data.user._id}`)
// //             } else {
// //                changeVisitorType('admin')
// //                navigate(`/admin/${response.data.data.user._id}`)
// //             }
// //             setData({
// //                uniqueId: '',
// //                password: '',
// //             })
// //          } else {
// //             throw new Error("Error while login a user")
// //          }
// //       } catch (error) {
// //          console.log(error)
// //          setErr(error.response?.data?.message || error.message || 'An error occured while login a user')
// //       }
// //    }

// //    useEffect(() => {
// //       const timer = setTimeout(() => {
// //          setErr('');
// //       }, 2000);

// //       return () => clearTimeout(timer);
// //    }, [err]);

// //    return (

// //       <div id="login">
// //          {err &&
// //             <div className="errorField">
// //                <p>{err}</p>
// //             </div>
// //          }
// //          <div className="log">
// //             <div className="signup-heading flex gap-5 flex-col">
// //                <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Login</p>
// //                <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Need an Account?
// //                   <Link to="/api/v1/auth/register">
// //                      <span className="login ">Register</span>
// //                   </Link>
// //                </p>
// //             </div>
// //             <form className="flex" onSubmit={handleSubmit}>
// //                <div className="signup-form grid gap-10 sm:grid-cols-2">
// //                   <div className="field uniqueId">
// //                      <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
// //                      <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" maxLength={'12'} onChange={handleChange} value={data.uniqueId} />
// //                   </div>

// //                   <div className="field password">
// //                      <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Enter  Password </label>
// //                      <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" type="password" onChange={handleChange} value={data.password} />
// //                      <p className="text-sm sm:text-xl cursor-pointer forget-password ">
// //                         <Link to="forget-password">
// //                            Forget Password?
// //                         </Link>
// //                      </p>
// //                   </div>
// //                </div>
// //                <div className="button flex gap-8">
// //                   <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Login</span></button>

// //                   <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
// //                      <Link to="/api/v1/auth/register">
// //                         <span>&lt; Back</span>
// //                      </Link>
// //                   </button>
// //                </div>
// //             </form>
// //          </div>
// //       </div>

// //    )
// // }

// // export default Login
// import api from "../axiosInstance.js"
// import axios from "axios"
// import "../Styles/Login.css"
// import { userContext } from "../context.js"
// import { useState, useEffect, useContext } from "react"
// import React from 'react'
// import { Link, useNavigate } from "react-router-dom"
// import { server } from "../server.js"
// import { useDispatch } from "react-redux"
// import { setUserId } from "../Redux/slicer.js"

// function Login() {
//    const dispatch = useDispatch()
//    const [data, setData] = useState({
//       uniqueId: '',
//       password: '',
//    })
//    const [err, setErr] = useState('')


//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setData({ ...data, [name]: value })
//    }

//    const navigate = useNavigate()
//    const { visitorType, changeVisitorType } = useContext(userContext)
//    const { visitorId, updateVisitorId } = useContext(userContext)

//    // const handleSubmit = async (e) => {
//    //    e.preventDefault();
//    //    try {
//    //       const user = {
//    //          uniqueId: data.uniqueId,
//    //          password: data.password
//    //       };
   
//    //       const response = await axios.post(`${server}/auth/login`, user, {
//    //          headers: {
//    //             "Content-Type": "application/json"
//    //          }
//    //       });
   
//    //       // Check the full structure of the response
//    //       console.log(response.data); // Log full response

//    //       //  admin ke liye 2 data and user ke liye 3 data
//    //       // Safely access the response data
//    //       const userData = response?.data?.data?.data;
   
//    //       if (userData) {

//    //          // admin ke liye response.data.data.token and user ke liye response.data.data.accessToken
//    //          localStorage.setItem("accessToken", response.data.data.accessToken);


//    //          // user ke liye
//    //          const id = userData._id;

//    //          // // admin ke liye
//    //          // const id = userData.user._id;
   
//    //          console.log(id); // Log the user ID
   
//    //          // Proceed with setting userId and navigating
//    //          updateVisitorId(id);
//    //          dispatch(setUserId(id));
   
//    //          if (userData.role === 'user') {
//    //             changeVisitorType('user');
//    //             navigate(`/${id}`);
//    //          } else {
//    //             changeVisitorType('admin');
//    //             navigate(`/admin/${id}`);
//    //          }
   
//    //          setData({
//    //             uniqueId: '',
//    //             password: '',
//    //          });
//    //       } else {
//    //          throw new Error("Error: Data is not in the expected structure.");
//    //       }
//    //    } catch (error) {
//    //       console.log(error);
//    //       setErr(error.response?.data?.message || error.message || 'An error occurred while logging in the user');
//    //    }
//    // };
   
//    // const handleSubmit = async (e) => {
//    //    e.preventDefault();
//    //    try {
//    //      const user = {
//    //        uniqueId: data.uniqueId,
//    //        password: data.password
//    //      };
        
//    //      const response = await axios.post(`${server}/auth/login`, user, {
//    //        headers: {
//    //          "Content-Type": "application/json"
//    //        }
//    //      });
        
//    //      // Log full response for debugging
//    //      console.log(response.data);
        
//    //      // Safely access nested data properties
//    //      const responseData = response?.data?.data;
        
//    //      if (!responseData) {
//    //        throw new Error("Error: Data is not in the expected structure.");
//    //      }
        
//    //      // Determine if we're handling admin or user data
//    //    //   const userData = responseData.data || responseData;
//    //    //   const userRole = userData.role;
//    //    let userData='';
//    //    let userRole='';
//    //    if(responseData.data.role==='user')
//    //    {
//    //       userData=responseData.data;
//    //       userRole=userData.role
//    //    }
//    //    else
//    //    {
//    //       userData=responseData;
//    //       userRole=userData.role
//    //    }
        
//    //      // Handle token storage - can be accessToken or token
//    //      const token = responseData.accessToken || responseData.token;
//    //      localStorage.setItem("accessToken", token);
        
//    //      // Determine the correct user ID based on role
//    //      let userId;
//    //      if (userRole === 'admin') {
//    //        // For admin, the ID might be nested in user object
//    //        userId = userData.user?._id || userData._id;
//    //      } else {
//    //        // For regular users
//    //        userId = userData._id;
//    //      }
        
//    //      console.log(userId); // Log the user ID
        
//    //      // Update state with user ID
//    //      updateVisitorId(userId);
//    //      dispatch(setUserId(userId));
        
//    //      // Navigate based on role
//    //      if (userRole === 'user') {
//    //        changeVisitorType('user');
//    //        navigate(`/${userId}`);
//    //      } else {
//    //        changeVisitorType('admin');
//    //        navigate(`/admin/${userId}`);
//    //      }
        
//    //      // Reset form data
//    //      setData({
//    //        uniqueId: '',
//    //        password: '',
//    //      });
        
//    //    } catch (error) {
//    //      console.log(error);
//    //      setErr(error.response?.data?.message || error.message || 'An error occurred while logging in the user');
//    //    }
//    //  };
//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const user = {
//             uniqueId: data.uniqueId,
//             password: data.password
//          };
         
//          const response = await axios.post(`${server}/auth/login`, user, {
//             headers: {
//                "Content-Type": "application/json"
//             }
//          });
   
//          console.log("Full Response:", response.data); // Debugging
         
//          const responseData = response?.data?.data;
//          if (!responseData) throw new Error("Invalid response structure.");
   
//          const userData = responseData.data || responseData; 
//          const userRole = userData.role;
//          const token = responseData.accessToken || responseData.token;
//          const userId = userData.user?._id || userData._id;
   
//          if (!userId) throw new Error("User ID not found in response.");
         
//          // Store token securely
//          localStorage.setItem("accessToken", token);
   
//          // Update user state
//          updateVisitorId(userId);
//          dispatch(setUserId(userId));
//          changeVisitorType(userRole);
         
//          // Redirect based on role
//          navigate(userRole === 'user' ? `/${userId}` : `/admin/${userId}`);
   
//          // Reset form data
//          setData({ uniqueId: '', password: '' });
   
//       } catch (error) {
//          console.error("Login Error:", error);
//          setErr(error.response?.data?.message || error.message || "An error occurred while logging in.");
//       }
//    };
   
    
//    useEffect(() => {
//       const timer = setTimeout(() => {
//          setErr('');
//       }, 2000);

//       return () => clearTimeout(timer);
//    }, [err]);

//    return (

//       <div id="login">
//          {err &&
//             <div className="errorField">
//                <p>{err}</p>
//             </div>
//          }
//          <div className="log">
//             <div className="signup-heading flex gap-5 flex-col">
//                <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Login</p>
//                <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Need an Account?
//                   <Link to="/api/v1/auth/register">
//                      <span className="login ">Register</span>
//                   </Link>
//                </p>
//             </div>
//             <form className="flex" onSubmit={handleSubmit}>
//                <div className="signup-form grid gap-10 sm:grid-cols-2">
//                   <div className="field uniqueId">
//                      <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
//                      <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" maxLength={'12'} onChange={handleChange} value={data.uniqueId} />
//                   </div>

//                   <div className="field password">
//                      <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Enter  Password </label>
//                      <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" type="password" onChange={handleChange} value={data.password} />
//                      <p className="text-sm sm:text-xl cursor-pointer forget-password ">
//                         <Link to="forget-password">
//                            Forget Password?
//                         </Link>
//                      </p>
//                   </div>
//                </div>
//                <div className="button flex gap-8">
//                   <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Login</span></button>

//                   <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
//                      <Link to="/api/v1/auth/register">
//                         <span>&lt; Back</span>
//                      </Link>
//                   </button>
//                </div>
//             </form>
//          </div>
//       </div>

//    )
// }

// export default Login
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
    uniqueId: '',
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
        uniqueId: data.uniqueId,
        password: data.password
      };

      const response = await axios.post(`${server}/auth/login`, user, {
        headers: {
          "Content-Type": "application/json"
        }
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
      setData({ uniqueId: '', password: '' });
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
            <div className="field uniqueId">
              <label htmlFor="uniqueId" className="text-lg lg:text-xl xl:text-2xl font-light">
                Enter Aadhar Card Number
              </label>
              <input 
                className="sm:w-3/4 text-sm lg:text-lg font-semibold" 
                name="uniqueId" 
                id="uniqueId" 
                type="text" 
                maxLength={'12'} 
                onChange={handleChange} 
                value={data.uniqueId} 
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