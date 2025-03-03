// import { Link } from 'react-router-dom'
// import React, { useContext, useState } from 'react'
// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import "../Styles/Profile.css"
// import { server } from '../server'
// import { serverWithId } from '../server'
// import axios from 'axios'
// import api from "../axiosInstance"
// import { userContext } from '../context'
// import Button from './Button'

// function Profile() {
//    const userId = useSelector(state => state.userValues.userId)
//    const [user, setUserData] = useState({})
//    const [err, setErr] = useState('')
//    const { updateUserData } = useContext(userContext)
//    const { visitorType } = useContext(userContext)

//    useEffect(() => {
//       getUserDetails()
//    }, [])

//    const getUserDetails = async () => {
//       try {
//          const token = localStorage.getItem('accessToken')
//          const response = await axios.get(`${serverWithId}/${userId}/api/v1/user/profile`, {
//             headers: {
//                Authorization: `Bearer ${token}`
//             }
//          })
//          if (!response) throw new Error('Error while fethcing the user details')
//          setUserData(response.data.data)
//          updateUserData(response.data.data)
//       } catch (err) {
//          console.log(err,err.message)
//          setErr(err.response?.data?.message || err.message || 'Please Login again to see the credentials')
//       }
//    }

//    useEffect(() => {
//       const timer = setTimeout(() => {
//          setErr('');
//       }, 2000);
//       return () => clearTimeout(timer);
//    }, [err]);

//    return (
//       <>
//          {err &&
//             <div className="errorField">
//                <p>{err}</p>
//             </div>
//          }
//          <div className="user-profile">
//             <div className="header">
//                <button type="button" id="back" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
//                   <Link to={`/${userId}`} state={visitorType}>
//                      <span>&lt; Back</span>
//                   </Link>
//                </button>
//                <Button innerText="Update Profile" link={`update`} />
//             </div>
//             <div className="profile-details">
//                {user.avatar ?
//                   <img src={user.avatar} alt="User Avatar" className="avatar" />
//                   : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVto1t4ROcxcqi0SrFtgSQQJ1Aau0ad1d3g&s" alt="No Avatar" className="avatar" />
//                }
//                <div className="info">
//                   <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>First Name:</strong> {user.firstName}</p>
//                   <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Last Name:</strong> {user.lastName}</p>
//                   <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Password:</strong> •••••••</p>
//                   <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Unique ID:</strong> {user.uniqueId}</p>
//                   <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Voter ID:</strong> {user.voterId}</p>
//                   <p className='text-[#161515] text-2xl md:text-xl lg:text-2xl'><strong>Voted:</strong> {user.isVoted ? "Yes" : "No"}</p>
//                </div>
//             </div>
//          </div>
//       </>
//    )
// }

// export default Profile
import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { server } from '../server'
import { serverWithId } from '../server'
import axios from 'axios'
import api from "../axiosInstance"
import { userContext } from '../context'
import Button from './Button'

function Profile() {
   const userId = useSelector(state => state.userValues.userId)
   const [user, setUserData] = useState({})
   const [err, setErr] = useState('')
   const { updateUserData } = useContext(userContext)
   const { visitorType } = useContext(userContext)

   useEffect(() => {
      getUserDetails()
   }, [])

   const getUserDetails = async () => {
      try {
         const token = localStorage.getItem('accessToken')
         const response = await axios.get(`${serverWithId}/${userId}/api/v1/user/profile`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         if (!response) throw new Error('Error while fethcing the user details')
         setUserData(response.data.data)
         updateUserData(response.data.data)
      } catch (err) {
         console.log(err,err.message)
         setErr(err.response?.data?.message || err.message || 'Please Login again to see the credentials')
      }
   }

   useEffect(() => {
      const timer = setTimeout(() => {
         setErr('');
      }, 2000);
      return () => clearTimeout(timer);
   }, [err]);

   return (
      <>
         {err &&
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
               <p>{err}</p>
            </div>
         }
         <div className="min-h-screen bg-black text-white p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
               <div className="flex justify-between items-center mb-8">
                  <button type="button" className="text-xl md:text-2xl py-2 px-4 hover:text-gray-300 transition">
                     <Link to={`/${userId}`} state={visitorType}>
                        <span>&lt; Back</span>
                     </Link>
                  </button>
                  <div className="flex-shrink-0">
                     <Button innerText="Update Profile" link={`update`} />
                  </div>
               </div>
               
               <div className="bg-gray-900 rounded-xl p-6 md:p-8 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                     <div className="flex-shrink-0">
                        {user.avatar ?
                           <img 
                              src={user.avatar} 
                              alt="User Avatar" 
                              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-600" 
                           />
                           : 
                           <img 
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVto1t4ROcxcqi0SrFtgSQQJ1Aau0ad1d3g&s" 
                              alt="No Avatar" 
                              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-600" 
                           />
                        }
                     </div>
                     
                     <div className="flex-grow space-y-4 w-full">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div className="bg-gray-800 p-4 rounded-lg">
                              <h3 className="text-gray-400 text-sm mb-1">First Name</h3>
                              <p className="text-xl md:text-2xl font-semibold">{user.firstName || "—"}</p>
                           </div>
                           
                           <div className="bg-gray-800 p-4 rounded-lg">
                              <h3 className="text-gray-400 text-sm mb-1">Last Name</h3>
                              <p className="text-xl md:text-2xl font-semibold">{user.lastName || "—"}</p>
                           </div>
                           
                           <div className="bg-gray-800 p-4 rounded-lg">
                              <h3 className="text-gray-400 text-sm mb-1">Password</h3>
                              <p className="text-xl md:text-2xl font-semibold">•••••••</p>
                           </div>
                           
                           <div className="bg-gray-800 p-4 rounded-lg">
                              <h3 className="text-gray-400 text-sm mb-1">Unique ID</h3>
                              <p className="text-xl md:text-2xl font-semibold">{user.uniqueId || "—"}</p>
                           </div>
                           
                           <div className="bg-gray-800 p-4 rounded-lg">
                              <h3 className="text-gray-400 text-sm mb-1">Voter ID</h3>
                              <p className="text-xl md:text-2xl font-semibold">{user.voterId || "—"}</p>
                           </div>
                           
                           <div className="bg-gray-800 p-4 rounded-lg">
                              <h3 className="text-gray-400 text-sm mb-1">Voted</h3>
                              <p className="text-xl md:text-2xl font-semibold">
                                 <span className={user.isVoted ? "text-green-500" : "text-yellow-500"}>
                                    {user.isVoted ? "Yes" : "No"}
                                 </span>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Profile