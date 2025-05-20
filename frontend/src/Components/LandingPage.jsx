// import Button from "./Button"
// import '../Styles/LandingPage.css'
// import {userContext} from "../context.js"
// import { useContext } from "react"
// function LandingPage() {
//      const { visitorType } = useContext(userContext)
//      return (
//           <>
//                <section>
//                     <div>
//                          <p className="heading text-6xl md:text-7xl lg:text-8xl">Your Voice, Your Vote, Your Future.</p>
//                          <p className="subheading  text-2xl md:text-3xl lg:text-4xl">Shape the Country you want to live in. Participate in the democratic process and let your voice be heard. Every vote counts towards building a better future.</p>
//                          {visitorType === '' && <Button innerText={'Vote Now'} link={'api/v1/auth/register'} />}
//                          {visitorType === 'user' && <Button innerText={'Vote Now'} link={'api/v1/candidates/enter-election'} />}
//                          {visitorType === 'admin' && ''}

//                     </div>
//                </section>
//           </>
//      )
// }

// export default LandingPage

// import { Link } from 'react-router-dom';
// import { userContext } from "../context.js";
// import { useContext } from "react";

// function LandingPage() {
//     const { visitorType } = useContext(userContext);
    
//     return (
//         <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
//             <div className="w-full max-w-5xl">
//                 <div className="relative z-10">
//                     {/* Animated elements in background */}
//                     <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
//                     <div className="absolute -bottom-20 left-40 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
//                     <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
                
//                     <div className="text-center">
//                         <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
//                             <span className="block">Your Voice,</span>
//                             <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Your Vote,</span>
//                             <span className="block">Your Future.</span>
//                         </h1>
                        
//                         <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
//                             Shape the community you want to live in. Participate in the democratic process and 
//                             let your voice be heard. Every vote counts towards building a better future.
//                         </p>
                        
//                         {visitorType === '' && (
//                             <Link 
//                                 to={'api/v1/auth/register'}
//                                 className="inline-block px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
//                             >
//                                 Vote Now
//                             </Link>
//                         )}
                        
//                         {visitorType === 'user' && (
//                             <Link 
//                                 to={'api/v1/candidates/enter-election'}
//                                 className="inline-block px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
//                             >
//                                 Vote Now
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LandingPage;
import { Link } from 'react-router-dom';
import { userContext } from "../context.js";
import { useContext, useEffect, useState } from "react";

function LandingPage() {
    const { visitorType } = useContext(userContext);
    const [visible, setVisible] = useState(false);
    
    // Text for animation
    const taglines = ["Your Voice", "Your Vote", "Your Future"];
    const [currentTagline, setCurrentTagline] = useState(0);
    
    useEffect(() => {
        // Show content with delay for entrance animation
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300);
        
        // Rotate taglines
        const taglineInterval = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }, 3000);
        
        return () => {
            clearTimeout(timer);
            clearInterval(taglineInterval);
        };
    }, []);
    
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute right-10 top-1/3 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
            
            <div className={`w-full max-w-6xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Horizontal layout for larger screens */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Hero text section */}
                    <div className="lg:w-1/2 text-left">
                        <div className="mb-6 h-36">
                            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight flex flex-col">
                                <span className={`transition-all duration-500 ${currentTagline === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}>
                                    {taglines[0]}
                                </span>
                                <span className={`transition-all duration-500 ${currentTagline === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}>
                                    {taglines[1]}
                                </span>
                                <span className={`transition-all duration-500 ${currentTagline === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}>
                                    {taglines[2]}
                                </span>
                                <span className="mt-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-6xl md:text-7xl">
                                    Matters
                                </span>
                            </h1>
                        </div>
                        
                        <p className="text-2xl text-gray-300 leading-relaxed mb-8 max-w-xl">
                            Shape the community you want to live in. Participate in the democratic process and 
                            let your voice be heard. Every vote counts towards building a better future.
                        </p>
                        
                        <div>
                            {visitorType === '' && (
                                <Link 
                                    to={'api/v1/auth/register'}
                                    className="inline-block px-10 py-5 text-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    Vote Now
                                </Link>
                            )}
                            
                            {visitorType === 'user' && (
                                <Link 
                                    to={'api/v1/candidates/enter-election'}
                                    className="inline-block px-10 py-5 text-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
                                >
                                    Vote Now
                                </Link>
                            )}
                        </div>
                    </div>
                    
                    {/* Visual element on the right */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative w-96 h-96">
                            {/* Animated ballot box visualization */}
                            <div className={`absolute inset-0 border-4 border-white rounded-lg ${visible ? 'animate-float' : ''}`}>
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/2 h-2 bg-white rounded"></div>
                                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-white/50 rounded"></div>
                                
                                {/* Animated ballot papers */}
                                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-blue-200 rounded animate-fallingPaper" style={{animationDelay: '0s'}}></div>
                                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-purple-200 rounded animate-fallingPaper" style={{animationDelay: '1.5s'}}></div>
                                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-pink-200 rounded animate-fallingPaper" style={{animationDelay: '3s'}}></div>
                                
                                {/* Vote check mark that appears */}
                                <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 text-7xl text-green-400 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                                    ✓
                                </div>
                            </div>
                            
                            {/* Concentric circles with pulse animations */}
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" style={{animationDuration: '3s'}}></div>
                            <div className="absolute inset-8 rounded-full border-2 border-purple-400/30 animate-ping" style={{animationDuration: '3.5s'}}></div>
                            <div className="absolute inset-16 rounded-full border-2 border-pink-400/30 animate-ping" style={{animationDuration: '4s'}}></div>
                        </div>
                    </div>
                </div>
                
                {/* Horizontal scrolling text at bottom */}
                <div className="mt-16 overflow-hidden">
                    <div className="whitespace-nowrap animate-scrollText">
                        <span className="text-2xl text-gray-500 mx-4">Democracy</span>
                        <span className="text-2xl text-blue-400 mx-4">•</span>
                        <span className="text-2xl text-gray-500 mx-4">Participation</span>
                        <span className="text-2xl text-purple-400 mx-4">•</span>
                        <span className="text-2xl text-gray-500 mx-4">Community</span>
                        <span className="text-2xl text-pink-400 mx-4">•</span>
                        <span className="text-2xl text-gray-500 mx-4">Change</span>
                        <span className="text-2xl text-blue-400 mx-4">•</span>
                        <span className="text-2xl text-gray-500 mx-4">Democracy</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage; 