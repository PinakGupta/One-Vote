// // // Navbar.js
// // import image from '../../assets/logo.png';
// // import Button from './Button';
// // import '../Styles/NavBar.css';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { server } from '../server';
// // import { Link as ScrollLink } from 'react-scroll';
// // import { userContext } from '../context';
// // import { useContext, useState } from 'react';
// // import {useDispatch} from 'react-redux'
// // import api from '../axiosInstance';
// // import {setUserId} from "../Redux/slicer.js"
// // // scrollLink is used to add a smooth scrolling effect when a user click on the item in the navbar it will navigate to that section

// // const Navbar = () => {
// //      const { visitorType } = useContext(userContext)
// //      const { updateVisitorId } = useContext(userContext)
// //      const { changeVisitorType } = useContext(userContext)
// //      const dispatch=useDispatch()
// //      const navigate = useNavigate()
// //      const [err, setErr] = useState('')

// //      // const handleLogout = async () => {
// //      //      const token = localStorage.getItem('accessToken')
// //      //      try {
// //      //           const response = await api.post(`${server}/auth/logout`, null, {
// //      //                headers: {
// //      //                     Authorization: `Bearer ${token}`
// //      //                }
// //      //           })
// //      //           if (response.status === 200) {
// //      //                localStorage.removeItem('accessToken')
// //      //                updateVisitorId('')
// //      //                changeVisitorType('')
// //      //                dispatch(setUserId(''))
// //      //                navigate('/')
// //      //           }
// //      //      } catch (err) {
// //      //           console.log(err)
// //      //           setErr(err.response?.data?.message || err.message || 'Sorry for inconvenience, I am trying to resolve the issue')
// //      //      }
// //      // }
// //      const handleLogout = async () => {
// //           const token = localStorage.getItem('accessToken');
// //           console.log("Token:", token); // Check if token is present and valid
      
// //           if (!token) {
// //               console.error("No token found");
// //               return;
// //           }
      
// //           try {
// //               const response = await api.post(`${server}/auth/logout`, null, {
// //                   headers: {
// //                       Authorization: `Bearer ${token}`
// //                   }
// //               });
      
// //               console.log(response);
// //               if (response.status === 200) {
// //                   localStorage.removeItem('accessToken');
// //                   updateVisitorId('');
// //                   changeVisitorType('');
// //                   dispatch(setUserId(''));
// //                   navigate('/');
// //               }
// //           } catch (err) {
// //               console.error("Logout Error:", err);
// //               setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
// //           }
// //       };
      
// //      // const handleLogout = async () => {
// //      //      const token = localStorage.getItem('accessToken');
// //      //      try {
// //      //         const response = await api.post(`${server}/auth/logout`, null, {
// //      //            headers: {
// //      //               Authorization: `Bearer ${token}`
// //      //            },
// //      //           //  withCredentials: true // Important if your auth uses cookies
// //      //         });
// //      //           console.log(response)
// //      //         if (response.status === 200) {
// //      //            localStorage.removeItem('accessToken');
// //      //            updateVisitorId('');
// //      //            changeVisitorType('');
// //      //            dispatch(setUserId(''));
// //      //            navigate('/');
// //      //         }
// //      //      } catch (err) {
// //      //         console.error("Logout Error:", err);
// //      //         setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
// //      //      }
// //      //   };
       

// //      return (
// // <nav className='navbar mt-10 max-sm:justify-center md:gap-4'>
// //     <div className="leftSide">
// //         <img src={logo} alt="Logo image" />
// //         <p>One Vote</p>
// //     </div>
// //     <div className="rightSide">
// //         <ul className='text-2xl 2xl:text-4xl'>
// //             <li>
// //                 <Link to='/'>Home</Link>
// //             </li>
// //             <li>
// //                 <ScrollLink to="working" smooth={true} duration={1000}>
// //                     How it Works
// //                 </ScrollLink>
// //             </li>
// //             <li>
// //                 <ScrollLink to="regulations" smooth={true} duration={1000}>
// //                     Rules
// //                 </ScrollLink>
// //             </li>
// //             <li>
// //                 <ScrollLink to="contact" smooth={true} duration={1000}>
// //                     Contact Us
// //                 </ScrollLink>
// //             </li>

// //             {visitorType === 'user' && (
// //                 <li>
// //                     <Link to="api/v1/user/profile">
// //                         Profile
// //                     </Link>
// //                 </li>
// //             )}
// //         </ul>
        
// //         {visitorType === '' && (
// //             <Button innerText="Register" link="api/v1/auth/register" />
// //         )}
        
// //         {visitorType === 'user' && (
// //             <>
// //                 <Button innerText="View Result" link="declare-result" />
// //                 <Button innerText="Vote Now" link="api/v1/candidates/candidate-list" />
// //                 <Button innerText="Logout" onClick={(e) => handleLogout(e)} />
// //             </>
// //         )}
// //     </div>
// // </nav>
// //      );
// // };

// // export default Navbar;

// // Navbar.js
// // import image from '../../assets/logo.png';
// // import Button from './Button';
// // import '../Styles/NavBar.css';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { server } from '../server';
// // import { Link as ScrollLink } from 'react-scroll';
// // import { userContext } from '../context';
// // import { useContext, useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import api from '../axiosInstance';
// // import { setUserId } from "../Redux/slicer.js";
// // // scrollLink is used to add a smooth scrolling effect when a user click on the item in the navbar it will navigate to that section

// // const Navbar = () => {
// //     const { visitorType, updateVisitorId, changeVisitorType } = useContext(userContext);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const [err, setErr] = useState('');

// //     const handleLogout = async (e) => {
// //         e.preventDefault();
// //         const token = localStorage.getItem('accessToken');
// //         console.log("Token:", token); // Check if token is present and valid
      
// //         if (!token) {
// //             console.error("No token found");
// //             return;
// //         }
      
// //         try {
// //             const response = await api.post(`${server}/auth/logout`, null, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`
// //                 }
// //             });
      
// //             console.log(response);
// //             if (response.status === 200) {
// //                 localStorage.removeItem('accessToken');
// //                 updateVisitorId('');
// //                 changeVisitorType('');
// //                 dispatch(setUserId(''));
// //                 navigate('/');
// //             }
// //         } catch (err) {
// //             console.error("Logout Error:", err);
// //             setErr(err.response?.data?.message || err.message || 'Sorry for the inconvenience, we are working to resolve the issue.');
// //         }
// //     };

// //     return (
// //         <nav className='navbar mt-10 max-sm:justify-center md:gap-4'>
// //             <div className="leftSide">
// //                 <img src={image} alt="Logo image" />
// //                 <p>One Vote</p>
// //             </div>
// //             <div className="rightSide">
// //                 <ul className='text-2xl 2xl:text-4xl'>
// //                     <li>
// //                         <Link to='/'>Home</Link>
// //                     </li>
// //                     <li>
// //                         <ScrollLink to="working" smooth={true} duration={1000}>
// //                             How it Works
// //                         </ScrollLink>
// //                     </li>
// //                     <li>
// //                         <ScrollLink to="regulations" smooth={true} duration={1000}>
// //                             Rules
// //                         </ScrollLink>
// //                     </li>
// //                     <li>
// //                         <ScrollLink to="contact" smooth={true} duration={1000}>
// //                             Contact Us
// //                         </ScrollLink>
// //                     </li>

// //                     {visitorType === 'user' && (
// //                         <li>
// //                             <Link to="api/v1/user/profile">
// //                                 Profile
// //                             </Link>
// //                         </li>
// //                     )}
// //                 </ul>
                
// //                 {visitorType === '' && (
// //                     <Button innerText="Register" link="api/v1/auth/register" />
// //                 )}
                
// //                 {visitorType === 'user' && (
// //                     <>
// //                         <Button innerText="View Result" link="declare-result" />
// //                         <Button innerText="Vote Now" link="api/v1/candidates/candidate-list" />
// //                         <Button innerText="Logout" onClick={(e) => handleLogout(e)} />
// //                     </>
// //                 )}
// //             </div>
// //         </nav>
// //     );
// // };

// // export default Navbar;
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
//                     <Button innerText="Register" link="/role-selector" />
//                 )}
                
//                 {visitorType === 'user' && (
//                     <>
//                         <Button innerText="View Result" link="enter-result" />
//                         <Button innerText="Vote Now" link="api/v1/candidates/enter-election" />
//                         <Button innerText="Logout" onClick={(e) => handleLogout(e)} />
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { userContext } from '../context';
import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../axiosInstance';
import { setUserId } from "../Redux/slicer.js";
import { server } from '../server';

const Navbar = () => {
    const { visitorType, updateVisitorId, changeVisitorType } = useContext(userContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleLogout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className={`fixed w-full px-6 py-5 transition-all duration-500 z-50 ${
            scrolled 
                ? 'bg-black/90 backdrop-blur-lg shadow-lg' 
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="flex items-center group">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-lg transform transition-all duration-300 group-hover:scale-110">
                        <span className="text-white font-bold text-2xl">O</span>
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-300 group-hover:to-purple-400">
                        OneVote
                    </span>
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button 
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>
                
                {/* Desktop menu */}
                <div className={`w-full md:block md:w-auto ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row md:space-x-10 space-y-3 md:space-y-0 mt-6 md:mt-0 font-medium text-lg">
                        <li>
                            <Link to='/' className="block py-2 text-white hover:text-blue-400 transition-colors relative group">
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <ScrollLink 
                                to="working" 
                                smooth={true} 
                                duration={1000}
                                className="block py-2 cursor-pointer text-white hover:text-blue-400 transition-colors relative group"
                            >
                                How it Works
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink 
                                to="regulations" 
                                smooth={true} 
                                duration={1000}
                                className="block py-2 cursor-pointer text-white hover:text-blue-400 transition-colors relative group"
                            >
                                Rules
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink 
                                to="contact" 
                                smooth={true} 
                                duration={1000}
                                className="block py-2 cursor-pointer text-white hover:text-blue-400 transition-colors relative group"
                            >
                                Contact Us
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </ScrollLink>
                        </li>
                        {visitorType === 'user' && (
                            <li>
                                <Link 
                                    to="api/v1/user/profile"
                                    className="block py-2 text-white hover:text-blue-400 transition-colors relative group"
                                >
                                    Profile
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                
                <div className={`w-full md:flex md:items-center md:w-auto md:justify-end mt-6 md:mt-0 space-y-3 md:space-y-0 md:space-x-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    {visitorType === '' && (
                        <Link 
                            to="/role-selector"
                            className="block w-full md:w-auto text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                        >
                            Register
                        </Link>
                    )}
                    
                    {visitorType === 'user' && (
                        <>
                            <Link 
                                to="enter-result"
                                className="block w-full md:w-auto text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                            >
                                View Results
                            </Link>
                            <Link 
                                to="api/v1/candidates/enter-election"
                                className="block w-full md:w-auto text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                            >
                                Vote Now
                            </Link>
                            <button
                                onClick={(e) => handleLogout(e)}
                                className="block w-full md:w-auto text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
            
            {err && (
                <div className="bg-red-500 text-white p-3 mt-2 rounded-md">
                    {err}
                </div>
            )}
        </nav>
    );
};

export default Navbar;