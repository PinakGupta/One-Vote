
// // import { useEffect, useState } from "react"
// // import "../Styles/Form.css"
// // import { server } from "../server.js"
// // import api from "../axiosInstance.js"

// // function Form() {

// //      const [data, setData] = useState({ username: '', phone: '', state: '', district: '', email: '', message: '', queryType: '' })
// //      const [states, setState] = useState([])
// //      const [districts, setDistricts] = useState([])
// //      const [apiAreas, setArea] = useState([])
// //      const [formError, setFormError] = useState(null)
// //      const [isSubmitted, setSubmit] = useState(false)


// //      const handleChange = (e) => {
// //           const { name, value } = e.target
// //           if (name == 'phone') {
// //                const numericRegex = /^\d*$/;
// //                if (!numericRegex.test(value)) {
// //                     return;
// //                }
// //           }
// //           setData({ ...data, [e.target.name]: e.target.value })
// //      }

// //      async function getAreaDetail() {
// //           try {
// //                const response = await api.get(`${server}/api/districts-and-states/district-state`)
// //                const areas = response.data.data?.[0]?.apiData?.states
// //                setArea(areas)
// //           } catch (err) {
// //                setFormError(err.response?.data?.message || 'An error occured while sending your query')

// //           }
// //      }

// //      useEffect(() => {
// //           getAreaDetail()
// //      }, [])

// //      useEffect(() => {
// //           if (apiAreas.length > 0) {
// //                getState()
// //           }
// //      }, [apiAreas])

// //      const getState = async () => {
// //           try {
// //                const res = apiAreas.map((item) => item.state)
// //                setState(res)
// //           } catch (error) {
// //                setFormError(err.response?.data?.message || err.message || 'An error occured while talking with database')
// //           }
// //      };

// //      useEffect(() => {
// //           setDistricts('')
// //           setData({ ...data, [data.district]: '' })
// //           getDistrict()
// //      }, [data.state])

// //      const getDistrict = async () => {
// //           try {
// //                const dis = apiAreas.find(item => item.state === data.state)
// //                if (dis) {
// //                     setDistricts(dis.districts);
// //                } else {
// //                     setDistricts([]);
// //                }
// //           } catch (err) {
// //                setFormError(err.response?.data?.message || 'An error occured while sending your query')
// //           }
// //      }

// //      const handleSubmit = async (e) => {
// //           e.preventDefault()
// //           try {
// //                const addQuery = {
// //                     username: data.username,
// //                     phone: data.phone,
// //                     state: data.state,
// //                     district: data.district,
// //                     email: data.email,
// //                     message: data.message,
// //                     queryType: data.queryType
// //                };
// //                const response = await api.post(`${server}/`, addQuery, {
// //                     headers: {
// //                          "Content-Type": "application/json"
// //                     }
// //                })
// //                if (response.status === 200) {
// //                     setSubmit(true)
// //                     setData({
// //                          username: '',
// //                          phone: '',
// //                          state: '',
// //                          email: '',
// //                          message: '',
// //                          queryType: '',
// //                          district: ''
// //                     })
// //                } else {
// //                     throw new Error('Error while sending your query')
// //                }
// //           } catch (err) {
// //                setFormError(err.response?.data?.message || 'An error occured while sending your query')
// //           }
// //      }

// //      useEffect(() => {
// //           const timer = setTimeout(() => {
// //                setSubmit(false);
// //                setFormError(null);
// //           }, 2000);

// //           return () => clearTimeout(timer);
// //      }, [isSubmitted, formError]);

// //      return (
// //           <div className="formSection">
// //                <div className="form-headings">
// //                     <p className=' text-3xl lg:text-4xl xl:text-5xl  2xl:text-6xl font-extrabold text-left'>Contact Us</p>
// //                     <p className="text-2xl lg:text-2xl xl:text-3xl  font-extralight">Report any problems or concerns related to the voting process</p>
// //                </div>

// //                <form className="flex" onSubmit={handleSubmit} >
// //                     <div className="allEnteries w-full grid  grid-cols-1 sm:grid-cols-2 gap-10 justify-between">
// //                          <div className="ele username">
// //                               <input className="text-lg lg:text-xl xl:text-2xl " type="text" name="username" value={data.username} id="username" onChange={handleChange} placeholder="Enter your name" required />
// //                          </div>
// //                          <div className="ele phone">
// //                               <input className="text-lg lg:text-xl xl:text-2xl " type="tel" name="phone" value={data.phone} id="phone" maxLength={10} onChange={handleChange} placeholder="Enter your Phone Number" required />
// //                          </div>
// //                          <div className="ele queryType">
// //                               <select className="text-lg lg:text-xl xl:text-2xl" id="contact-type" name="queryType" onChange={handleChange} value={data.queryType} required>
// //                                    <option value="">Select your queryType Type</option>
// //                                    <option value="general-inquiries">General Inquiries</option>
// //                                    <option value="technical-support">Technical Support</option>
// //                                    <option value="voting-issues">Voting Issues</option>
// //                                    <option value="feedback-suggestions">Feedback and Suggestions</option>
// //                                    <option value="dispute-resolution">Dispute Resolution</option>
// //                                    <option value="partnerships-collaborations">Partnerships and Collaborations</option>
// //                               </select>
// //                          </div>
// //                          <div className="ele email">
// //                               <input type="email" name="email" value={data.email} id="email" className="text-lg lg:text-xl xl:text-2xl" placeholder="Enter your Email" onChange={handleChange} />
// //                          </div>

// //                          <div className="ele states">
// //                               <select name="state" value={data.state} id="state" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
// //                                    <option value="">Select your State</option>
// //                                    {states && states.length > 0 && states.map((ele, index) => (
// //                                         <option key={index} value={ele.state}>{ele}</option>
// //                                    ))}
// //                               </select>
// //                          </div>
// //                          <div className="ele districts">
// //                               <select value={data.district} name="district" id="district" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
// //                                    <option value="">Select your District</option>
// //                                    {districts && districts.length > 0 && districts.map((ele, index) => (
// //                                         <option key={index} value={ele}>{ele}</option>
// //                                    ))}
// //                               </select>
// //                          </div>
// //                     </div>
// //                     <div className="ele message ">
// //                          <textarea value={data.message} placeholder="Enter your message" name="message" id="message" onChange={handleChange} className="textarea text-lg xl:text-xl"></textarea>
// //                     </div>
// //                     <div className="button">
// //                          <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Submit</span></button>
// //                     </div>
// //                </form>
// //                <div>
// //                     {isSubmitted && <p className="text-xl text-white lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight ">Form submitted successfully, we will contact you soon</p>}
// //                     {formError &&
// //                          <div className="errorField text-white">
// //                               <p>{formError}</p>
// //                          </div>
// //                     }
// //                </div>
// //           </div>
// //      )
// // }
// // export default Form

// import { useEffect, useState } from "react";
// import "../Styles/Form.css";
// import { server } from "../server.js";
// import api from "../axiosInstance.js";

// function Form() {
//     const [data, setData] = useState({ 
//         username: '', phone: '', state: '', district: '', email: '', message: '', queryType: '' 
//     });
//     const [states, setState] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [apiAreas, setArea] = useState([]);
//     const [formError, setFormError] = useState(null);
//     const [isSubmitted, setSubmit] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'phone') {
//             const numericRegex = /^\d*$/;
//             if (!numericRegex.test(value)) return;
//         }
//         setData({ ...data, [name]: value });
//     };

//     async function getAreaDetail() {
//         try {
//             const response = await api.get(`${server}/api/districts-and-states/district-state`);
//             const areas = response.data.data?.[0]?.apiData?.states || [];
//             setArea(areas);
//         } catch (err) {
//             setFormError(err.response?.data?.message || 'An error occurred while fetching area details');
//             setArea([]); // Ensure apiAreas is always an array
//         }
//     }

//     useEffect(() => {
//         getAreaDetail();
//     }, []);

//     useEffect(() => {
//         if (apiAreas?.length > 0) {
//             getState();
//         }
//     }, [apiAreas]);

//     const getState = () => {
//         try {
//             const res = apiAreas.map((item) => item.state);
//             setState(res);
//         } catch (error) {
//             setFormError('An error occurred while fetching states');
//         }
//     };

//     useEffect(() => {
//         setDistricts([]); // Reset districts properly
//         setData({ ...data, district: '' }); // Fix the reset district issue
//         getDistrict();
//     }, [data.state]);

//     const getDistrict = () => {
//         try {
//             const dis = apiAreas.find(item => item.state === data.state);
//             setDistricts(dis ? dis.districts : []);
//         } catch (err) {
//             setFormError('An error occurred while fetching districts');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const addQuery = { ...data };
//             const response = await api.post(`${server}/`, addQuery, {
//                 headers: { "Content-Type": "application/json" }
//             });

//             if (response.status === 200) {
//                 setSubmit(true);
//                 setData({
//                     username: '',
//                     phone: '',
//                     state: '',
//                     district: '',
//                     email: '',
//                     message: '',
//                     queryType: ''
//                 });
//             } else {
//                 throw new Error('Error while sending your query');
//             }
//         } catch (err) {
//             setFormError(err.response?.data?.message || 'An error occurred while sending your query');
//         }
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setSubmit(false);
//             setFormError(null);
//         }, 2000);

//         return () => clearTimeout(timer);
//     }, [isSubmitted, formError]);

//     return (
//         <div className="formSection">
//             <div className="form-headings">
//                 <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left'>Contact Us</p>
//                 <p className="text-2xl lg:text-2xl xl:text-3xl font-extralight">
//                     Report any problems or concerns related to the voting process
//                 </p>
//             </div>

//             <form className="flex" onSubmit={handleSubmit}>
//                 <div className="allEnteries w-full grid grid-cols-1 sm:grid-cols-2 gap-10 justify-between">
//                     <div className="ele username">
//                         <input className="text-lg lg:text-xl xl:text-2xl" type="text" name="username" value={data.username} onChange={handleChange} placeholder="Enter your name" required />
//                     </div>
//                     <div className="ele phone">
//                         <input className="text-lg lg:text-xl xl:text-2xl" type="tel" name="phone" value={data.phone} maxLength={10} onChange={handleChange} placeholder="Enter your Phone Number" required />
//                     </div>
//                     <div className="ele queryType">
//                         <select className="text-lg lg:text-xl xl:text-2xl" name="queryType" onChange={handleChange} value={data.queryType} required>
//                             <option value="">Select your query Type</option>
//                             <option value="general-inquiries">General Inquiries</option>
//                             <option value="technical-support">Technical Support</option>
//                             <option value="voting-issues">Voting Issues</option>
//                             <option value="feedback-suggestions">Feedback and Suggestions</option>
//                             <option value="dispute-resolution">Dispute Resolution</option>
//                             <option value="partnerships-collaborations">Partnerships and Collaborations</option>
//                         </select>
//                     </div>
//                     <div className="ele email">
//                         <input type="email" name="email" value={data.email} className="text-lg lg:text-xl xl:text-2xl" placeholder="Enter your Email" onChange={handleChange} required />
//                     </div>
//                     <div className="ele states">
//                         <select name="state" value={data.state} className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} required>
//                             <option value="">Select your State</option>
//                             {states.map((ele, index) => (
//                                 <option key={index} value={ele}>{ele}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="ele districts">
//                         <select value={data.district} name="district" className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} required>
//                             <option value="">Select your District</option>
//                             {districts.map((ele, index) => (
//                                 <option key={index} value={ele}>{ele}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="ele message">
//                     <textarea value={data.message} placeholder="Enter your message" name="message" onChange={handleChange} className="textarea text-lg xl:text-xl"></textarea>
//                 </div>
//                 <div className="button">
//                     <button type="submit" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24">
//                         <span>Submit</span>
//                     </button>
//                 </div>
//             </form>
//             {isSubmitted && <p className="text-xl text-white lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight">Form submitted successfully, we will contact you soon</p>}
//             {formError && <div className="errorField text-white"><p>{formError}</p></div>}
//         </div>
//     );
// }

// export default Form;
import { useEffect, useState } from "react";
import { server } from "../server.js";
import api from "../axiosInstance.js";

function Form() {
    const [data, setData] = useState({ 
        username: '', phone: '', state: '', district: '', email: '', message: '', queryType: '' 
    });
    const [states, setState] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [apiAreas, setArea] = useState([]);
    const [formError, setFormError] = useState(null);
    const [isSubmitted, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericRegex = /^\d*$/;
            if (!numericRegex.test(value)) return;
        }
        setData({ ...data, [name]: value });
    };

    async function getAreaDetail() {
        setIsLoading(true);
        try {
            const response = await api.get(`${server}/api/districts-and-states/district-state`);
            const areas = response.data.data?.[0]?.apiData?.states || [];
            setArea(areas);
        } catch (err) {
            setFormError(err.response?.data?.message || 'An error occurred while fetching area details');
            setArea([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAreaDetail();
    }, []);

    useEffect(() => {
        if (apiAreas?.length > 0) {
            getState();
        }
    }, [apiAreas]);

    const getState = () => {
        try {
            const res = apiAreas.map((item) => item.state);
            setState(res);
        } catch (error) {
            setFormError('An error occurred while fetching states');
        }
    };

    useEffect(() => {
        setDistricts([]);
        setData({ ...data, district: '' });
        getDistrict();
    }, [data.state]);

    const getDistrict = () => {
        try {
            const dis = apiAreas.find(item => item.state === data.state);
            setDistricts(dis ? dis.districts : []);
        } catch (err) {
            setFormError('An error occurred while fetching districts');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const addQuery = { ...data };
            const response = await api.post(`${server}/`, addQuery, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                setSubmit(true);
                setData({
                    username: '',
                    phone: '',
                    state: '',
                    district: '',
                    email: '',
                    message: '',
                    queryType: ''
                });
            } else {
                throw new Error('Error while sending your query');
            }
        } catch (err) {
            setFormError(err.response?.data?.message || 'An error occurred while sending your query');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSubmit(false);
            setFormError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isSubmitted, formError]);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Contact Us
                    </h2>
                    <p className="text-xl text-gray-300">
                        Report any problems or concerns related to the voting process
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Username */}
                            <div>
                                <label className="block text-gray-300 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={data.username} 
                                    onChange={handleChange} 
                                    placeholder="Enter your name" 
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                                    required 
                                />
                            </div>
                            
                            {/* Phone */}
                            <div>
                                <label className="block text-gray-300 mb-2">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={data.phone} 
                                    maxLength={10} 
                                    onChange={handleChange} 
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                                    required 
                                />
                            </div>
                            
                            {/* Query Type */}
                            <div>
                                <label className="block text-gray-300 mb-2">Query Type</label>
                                <select 
                                    name="queryType" 
                                    onChange={handleChange} 
                                    value={data.queryType}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                                    required
                                >
                                    <option value="">Select your query type</option>
                                    <option value="general-inquiries">General Inquiries</option>
                                    <option value="technical-support">Technical Support</option>
                                    <option value="voting-issues">Voting Issues</option>
                                    <option value="feedback-suggestions">Feedback and Suggestions</option>
                                    <option value="dispute-resolution">Dispute Resolution</option>
                                    <option value="partnerships-collaborations">Partnerships and Collaborations</option>
                                </select>
                            </div>
                            
                            {/* Email */}
                            <div>
                                <label className="block text-gray-300 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={data.email} 
                                    onChange={handleChange} 
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                                    required 
                                />
                            </div>
                            
                            {/* State */}
                            <div>
                                <label className="block text-gray-300 mb-2">State</label>
                                <select 
                                    name="state" 
                                    value={data.state} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                                    required
                                    disabled={isLoading || states.length === 0}
                                >
                                    <option value="">Select your state</option>
                                    {states.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* District */}
                            <div>
                                <label className="block text-gray-300 mb-2">District</label>
                                <select 
                                    name="district" 
                                    value={data.district} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                                    required
                                    disabled={isLoading || !data.state || districts.length === 0}
                                >
                                    <option value="">Select your district</option>
                                    {districts.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Message */}
                        <div>
                            <label className="block text-gray-300 mb-2">Message</label>
                            <textarea 
                                name="message" 
                                value={data.message} 
                                onChange={handleChange} 
                                placeholder="Enter your message"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white h-40" 
                                required
                            ></textarea>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button 
                                type="submit" 
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Submit'}
                            </button>
                        </div>
                    </form>
                    
                    {/* Feedback Messages */}
                    {isSubmitted && (
                        <div className="mt-6 py-3 px-4 bg-green-600 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-center">
                            Form submitted successfully! We'll get back to you soon.
                        </div>
                    )}
                    
                    {formError && (
                        <div className="mt-6 py-3 px-4 bg-red-600 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-center">
                            {formError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Form;