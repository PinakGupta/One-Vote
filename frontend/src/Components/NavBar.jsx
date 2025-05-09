// // Navbar.js
// import image from '../../assets/logo.png';
// import Button from './Button';
// import '../Styles/NavBar.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { server } from '../server';
// import { Link as ScrollLink } from 'react-scroll';
// import { userContext } from '../context';
// import { useContext, useState } from 'react';
// import {useDispatch} from 'react-redux'
// import api from '../axiosInstance';
// import {setUserId} from "../Redux/slicer.js"
// // scrollLink is used to add a smooth scrolling effect when a user click on the item in the navbar it will navigate to that section

// const Navbar = () => {
//      const { visitorType } = useContext(userContext)
//      const { updateVisitorId } = useContext(userContext)
//      const { changeVisitorType } = useContext(userContext)
//      const dispatch=useDispatch()
//      const navigate = useNavigate()
//      const [err, setErr] = useState('')

//      // const handleLogout = async () => {
//      //      const token = localStorage.getItem('accessToken')
//      //      try {
//      //           const response = await api.post(`${server}/auth/logout`, null, {
//      //                headers: {
//      //                     Authorization: `Bearer ${token}`
//      //                }
//      //           })
//      //           if (response.status === 200) {
//      //                localStorage.removeItem('accessToken')
//      //                updateVisitorId('')
//      //                changeVisitorType('')
//      //                dispatch(setUserId(''))
//      //                navigate('/')
//      //           }
//      //      } catch (err) {
//      //           console.log(err)
//      //           setErr(err.response?.data?.message || err.message || 'Sorry for inconvenience, I am trying to resolve the issue')
//      //      }
//      // }
//      const handleLogout = async () => {
//           const token = localStorage.getItem('accessToken');
//           console.log("Token:", token); // Check if token is present and valid
      
//           if (!token) {
//               console.error("No token found");
//               return;
//           }
      
//           try {
//               const response = await api.post(`${server}/auth/logout`, null, {
//                   headers: {
//                       Authorization: `Bearer ${token}`
//                   }
//               });
      
//               console.log(response);
//               if (response.status === 200) {
//                   localStorage.removeItem('accessToken');
//                   updateVisitorId('');
//                   changeVisitorType('');
//                   dispatch(setUserId(''));
//                   navigate('/');
//               }
//           } catch (err) {
//               console.error("Logout Error:", err);
//               setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
//           }
//       };
      
//      // const handleLogout = async () => {
//      //      const token = localStorage.getItem('accessToken');
//      //      try {
//      //         const response = await api.post(`${server}/auth/logout`, null, {
//      //            headers: {
//      //               Authorization: `Bearer ${token}`
//      //            },
//      //           //  withCredentials: true // Important if your auth uses cookies
//      //         });
//      //           console.log(response)
//      //         if (response.status === 200) {
//      //            localStorage.removeItem('accessToken');
//      //            updateVisitorId('');
//      //            changeVisitorType('');
//      //            dispatch(setUserId(''));
//      //            navigate('/');
//      //         }
//      //      } catch (err) {
//      //         console.error("Logout Error:", err);
//      //         setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
//      //      }
//      //   };
       

//      return (
// <nav className='navbar mt-10 max-sm:justify-center md:gap-4'>
//     <div className="leftSide">
//         <img src={logo} alt="Logo image" />
//         <p>One Vote</p>
//     </div>
//     <div className="rightSide">
//         <ul className='text-2xl 2xl:text-4xl'>
//             <li>
//                 <Link to='/'>Home</Link>
//             </li>
//             <li>
//                 <ScrollLink to="working" smooth={true} duration={1000}>
//                     How it Works
//                 </ScrollLink>
//             </li>
//             <li>
//                 <ScrollLink to="regulations" smooth={true} duration={1000}>
//                     Rules
//                 </ScrollLink>
//             </li>
//             <li>
//                 <ScrollLink to="contact" smooth={true} duration={1000}>
//                     Contact Us
//                 </ScrollLink>
//             </li>

//             {visitorType === 'user' && (
//                 <li>
//                     <Link to="api/v1/user/profile">
//                         Profile
//                     </Link>
//                 </li>
//             )}
//         </ul>
        
//         {visitorType === '' && (
//             <Button innerText="Register" link="api/v1/auth/register" />
//         )}
        
//         {visitorType === 'user' && (
//             <>
//                 <Button innerText="View Result" link="declare-result" />
//                 <Button innerText="Vote Now" link="api/v1/candidates/candidate-list" />
//                 <Button innerText="Logout" onClick={(e) => handleLogout(e)} />
//             </>
//         )}
//     </div>
// </nav>
//      );
// };

// export default Navbar;

// Navbar.js
// import image from '../../assets/logo.png';
// import Button from './Button';
// import '../Styles/NavBar.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { server } from '../server';
// import { Link as ScrollLink } from 'react-scroll';
// import { userContext } from '../context';
// import { useContext, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import api from '../axiosInstance';
// import { setUserId } from "../Redux/slicer.js";
// // scrollLink is used to add a smooth scrolling effect when a user click on the item in the navbar it will navigate to that section

// const Navbar = () => {
//     const { visitorType, updateVisitorId, changeVisitorType } = useContext(userContext);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [err, setErr] = useState('');

//     const handleLogout = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('accessToken');
//         console.log("Token:", token); // Check if token is present and valid
      
//         if (!token) {
//             console.error("No token found");
//             return;
//         }
      
//         try {
//             const response = await api.post(`${server}/auth/logout`, null, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
      
//             console.log(response);
//             if (response.status === 200) {
//                 localStorage.removeItem('accessToken');
//                 updateVisitorId('');
//                 changeVisitorType('');
//                 dispatch(setUserId(''));
//                 navigate('/');
//             }
//         } catch (err) {
//             console.error("Logout Error:", err);
//             setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
//         }
//     };

//     return (
//         <nav className='navbar mt-10 max-sm:justify-center md:gap-4'>
//             <div className="leftSide">
//                 <img src={image} alt="Logo image" />
//                 <p>One Vote</p>
//             </div>
//             <div className="rightSide">
//                 <ul className='text-2xl 2xl:text-4xl'>
//                     <li>
//                         <Link to='/'>Home</Link>
//                     </li>
//                     <li>
//                         <ScrollLink to="working" smooth={true} duration={1000}>
//                             How it Works
//                         </ScrollLink>
//                     </li>
//                     <li>
//                         <ScrollLink to="regulations" smooth={true} duration={1000}>
//                             Rules
//                         </ScrollLink>
//                     </li>
//                     <li>
//                         <ScrollLink to="contact" smooth={true} duration={1000}>
//                             Contact Us
//                         </ScrollLink>
//                     </li>

//                     {visitorType === 'user' && (
//                         <li>
//                             <Link to="api/v1/user/profile">
//                                 Profile
//                             </Link>
//                         </li>
//                     )}
//                 </ul>
                
//                 {visitorType === '' && (
//                     <Button innerText="Register" link="api/v1/auth/register" />
//                 )}
                
//                 {visitorType === 'user' && (
//                     <>
//                         <Button innerText="View Result" link="declare-result" />
//                         <Button innerText="Vote Now" link="api/v1/candidates/candidate-list" />
//                         <Button innerText="Logout" onClick={(e) => handleLogout(e)} />
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
import image from '../../assets/logo.png';
import Button from './Button';
import '../Styles/NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../server';
import { Link as ScrollLink } from 'react-scroll';
import { userContext } from '../context';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../axiosInstance';
import { setUserId } from "../Redux/slicer.js";

const Navbar = () => {
    const { visitorType, updateVisitorId, changeVisitorType } = useContext(userContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        console.log("Token:", token); // Check if token is present and valid
      
        if (!token) {
            console.error("No token found");
            return;
        }
      
        try {
            const response = await api.post(`${server}/auth/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
      
            console.log(response);
            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                updateVisitorId('');
                changeVisitorType('');
                dispatch(setUserId(''));
                navigate('/');
            }
        } catch (err) {
            console.error("Logout Error:", err);
            setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
        }
    };

    return (
        <nav className='navbar mt-10 max-sm:justify-center md:gap-4'>
            <div className="leftSide">
                <img src={image} alt="Logo image" />
                <p>One Vote</p>
            </div>
            <div className="rightSide">
                <ul className='text-2xl 2xl:text-4xl'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <ScrollLink to="working" smooth={true} duration={1000}>
                            How it Works
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="regulations" smooth={true} duration={1000}>
                            Rules
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="contact" smooth={true} duration={1000}>
                            Contact Us
                        </ScrollLink>
                    </li>

                    {visitorType === 'user' && (
                        <li>
                            <Link to="api/v1/user/profile">
                                Profile
                            </Link>
                        </li>
                    )}
                </ul>
                
                {visitorType === '' && (
                    <Button innerText="Register" link="/role-selector" />
                )}
                
                {visitorType === 'user' && (
                    <>
                        <Button innerText="View Result" link="enter-result" />
                        <Button innerText="Vote Now" link="api/v1/candidates/enter-election" />
                        <Button innerText="Logout" onClick={(e) => handleLogout(e)} />
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;