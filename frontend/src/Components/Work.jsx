// import React from 'react'
// import image1 from '../../assets/register.png'
// import image2 from '../../assets/selectOne.png'
// import image3 from '../../assets/done.png'
// import image4 from '../../assets/1.png'
// import image5 from '../../assets/2.png'
// import image6 from '../../assets/3.png'
// import '../Styles/Work.css'

// function Work() {
//      return (
//           <section id="workSection">
//                <div className="workHeading">
//                     <p className='workP text-3xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-extrabold'>How it Works?</p>
//                </div>
//                <div className="workProcess grid gap-8 sm:grid-cols-3">
//                     <div className="stage ">
//                          <img src={image1} alt="" />
//                          <p><img src={image4} />Register</p>
//                          <p className='innerDes'>Signup or login to your account with aadharcard number and voter ID to participate in election.</p>
//                     </div>
//                     <div className="stage">
//                          <img src={image2} alt="" />
//                          <p><img src={image5} />Choose Your Candidate</p>
//                          <p className='innerDes'>Choose whom you want to vote.</p>
//                     </div>
//                     <div className="stage">
//                          <img src={image3} alt="" />
//                          <p><img src={image6} />Done</p>
//                          <p className='innerDes'>Your response is submitted and wait for the results.</p>
//                     </div>
//                </div>
//           </section>
//      )
// }

// export default Work
import React from 'react';

function Work() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    How it Works
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Step 1 */}
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-blue-500">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">Register</h3>
                    <p className="text-gray-300 text-center">
                        Sign up or login to your account with email and password to participate in elections.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold">1</span>
                        </div>
                    </div>
                </div>
                
                {/* Step 2 */}
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-purple-500">
                    <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">Choose Your Candidate</h3>
                    <p className="text-gray-300 text-center">
                        Browse through candidates and select who you want to vote for in the election.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold">2</span>
                        </div>
                    </div>
                </div>
                
                {/* Step 3 */}
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-pink-500">
                    <div className="w-20 h-20 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">Done</h3>
                    <p className="text-gray-300 text-center">
                        Your vote is securely submitted. Check back for real-time results once the election ends.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center">
                            <span className="text-white font-bold">3</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Progress connector lines (visible on desktop) */}
            <div className="hidden md:block relative mt-8">
                <div className="absolute top-0 left-0 w-full h-2 flex justify-center">
                    <div className="w-2/3 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 absolute top-0"></div>
                </div>
            </div>
        </section>
    );
}

export default Work;