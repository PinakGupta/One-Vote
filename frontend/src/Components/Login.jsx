

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

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const user = {
//             uniqueId: data.uniqueId,
//             password: data.password
//          }
//          const response = await axios.post(`${server}/auth/login`, user, {
//             headers: {
//                "Content-Type": "application/json"
//             }
//          })
//          localStorage.setItem("accessToken", response.data.data.accessToken)
//          if (response.status === 200) {
//             updateVisitorId(response.data.data.user._id)
//             dispatch(setUserId(response.data.data.user._id))
//             if (response.data.data.user.role === 'user') {
//                changeVisitorType('user')
               
//                navigate(`/${response.data.data.user._id}`)
//             } else {
//                changeVisitorType('admin')
//                navigate(`/admin/${response.data.data.user._id}`)
//             }
//             setData({
//                uniqueId: '',
//                password: '',
//             })
//          } else {
//             throw new Error("Error while login a user")
//          }
//       } catch (error) {
//          console.log(error)
//          setErr(error.response?.data?.message || error.message || 'An error occured while login a user')
//       }
//    }

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
import api from "../axiosInstance.js"
import axios from "axios"
import "../Styles/Login.css"
import { userContext } from "../context.js"
import { useState, useEffect, useContext } from "react"
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { server } from "../server.js"
import { useDispatch } from "react-redux"
import { setUserId } from "../Redux/slicer.js"

function Login() {
   const dispatch = useDispatch()
   const [data, setData] = useState({
      uniqueId: '',
      password: '',
   })
   const [err, setErr] = useState('')


   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value })
   }

   const navigate = useNavigate()
   const { visitorType, changeVisitorType } = useContext(userContext)
   const { visitorId, updateVisitorId } = useContext(userContext)

   // const handleSubmit = async (e) => {
   //    e.preventDefault();
   //    try {
   //       const user = {
   //          uniqueId: data.uniqueId,
   //          password: data.password
   //       }
   //       const response = await axios.post(`${server}/auth/login`, user, {
   //          headers: {
   //             "Content-Type": "application/json"
   //          }
   //       })
   //       localStorage.setItem("accessToken", response.data.data.accessToken)
   //       if (response.status === 200) {
   //          console.log(response.data.data.data._id)
   //          updateVisitorId(response.data.data.data.user._id)
   //          dispatch(setUserId(response.data.data.data.user._id))
   //          if (response.data.data.data.user.role === 'user') {
   //             changeVisitorType('user')
   //             navigate(`/${response.data.data.data.user._id}`)
   //          } else {
   //             changeVisitorType('admin')
   //             navigate(`/admin/${response.data.data.data.user._id}`)
   //          }
   //          setData({
   //             uniqueId: '',
   //             password: '',
   //          })
   //       } else {
   //          throw new Error("Error while login a user")
   //       }
   //    } catch (error) {
   //       console.log(error)
   //       setErr(error.response?.data?.message || error.message || 'An error occured while login a user')
   //    }
   // }

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
   
         // Check the full structure of the response
         console.log(response.data); // Log full response
   
         // Safely access the response data
         const userData = response?.data?.data?.data;
   
         if (userData) {
            localStorage.setItem("accessToken", response.data.data.accessToken);
   
            console.log(userData._id); // Log the user ID
   
            // Proceed with setting userId and navigating
            updateVisitorId(userData._id);
            dispatch(setUserId(userData._id));
   
            if (userData.role === 'user') {
               changeVisitorType('user');
               navigate(`/${userData._id}`);
            } else {
               changeVisitorType('admin');
               navigate(`/admin/${userData._id}`);
            }
   
            setData({
               uniqueId: '',
               password: '',
            });
         } else {
            throw new Error("Error: Data is not in the expected structure.");
         }
      } catch (error) {
         console.log(error);
         setErr(error.response?.data?.message || error.message || 'An error occurred while logging in the user');
      }
   };
   
   useEffect(() => {
      const timer = setTimeout(() => {
         setErr('');
      }, 2000);

      return () => clearTimeout(timer);
   }, [err]);

   return (

      <div id="login">
         {err &&
            <div className="errorField">
               <p>{err}</p>
            </div>
         }
         <div className="log">
            <div className="signup-heading flex gap-5 flex-col">
               <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold'>Login</p>
               <p className=" flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">Need an Account?
                  <Link to="/api/v1/auth/register">
                     <span className="login ">Register</span>
                  </Link>
               </p>
            </div>
            <form className="flex" onSubmit={handleSubmit}>
               <div className="signup-form grid gap-10 sm:grid-cols-2">
                  <div className="field uniqueId">
                     <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="uniqueId">Enter Aadhar Card Number</label>
                     <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="uniqueId" id="uniqueId" type="text" maxLength={'12'} onChange={handleChange} value={data.uniqueId} />
                  </div>

                  <div className="field password">
                     <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="password">Enter  Password </label>
                     <input className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" name="password" id="password" type="password" onChange={handleChange} value={data.password} />
                     <p className="text-sm sm:text-xl cursor-pointer forget-password ">
                        <Link to="forget-password">
                           Forget Password?
                        </Link>
                     </p>
                  </div>
               </div>
               <div className="button flex gap-8">
                  <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Login</span></button>

                  <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
                     <Link to="/api/v1/auth/register">
                        <span>&lt; Back</span>
                     </Link>
                  </button>
               </div>
            </form>
         </div>
      </div>

   )
}

export default Login