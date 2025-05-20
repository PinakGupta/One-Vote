// import React from 'react'
// import '../Styles/Rules.css'

// function Rules() {
//      return (
//           <div id='rules'>
//                <div className="rules-headings">
//                     <p className='text-3xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-extrabold className="numbering"old text-left'>Rules & Regulations</p>
//                </div>

//                <div className="innerDes text-2xl xl:text-3xl 2xl:text-4xl font-light ">
//                     <span>
//                          <p className="numbering font-semibold">1)</p>
//                          <p className='numberDes'>All members aged 18 and above who have registered by registration deadline are eligible to vote.</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">2)</p>
//                          <p className='numberDes'>Voters must log in using their unique ID and password to cast their vote</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">3)</p>
//                          <p className='numberDes'>Voters can cast their votes through the online ballot available on the application. Instructions will be provided on the voting page.</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">4)</p>
//                          <p className='numberDes'>All votes are confidential. Voter information will be encrypted and used only for verification purposes.</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">5)</p>
//                          <p className='numberDes'>The application is designed to be accessible to all users. Assistance is available for those who need it by contacting us</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">6)</p>
//                          <p className='numberDes'>Vote tampering, coercion, and other fraudulent activities are strictly prohibited.</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">7)</p>
//                          <p className='numberDes'>Once your vote is submitted, it cannot be changed</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">8)</p>
//                          <p className='numberDes'>Only registered users are allowed to vote</p>
//                     </span>
//                     <span>
//                          <p className="numbering font-semibold">9)</p>
//                          <p className='numberDes'>Vote according to your own preferences and do not let others to influence your decision</p>
//                     </span>
//                     <span >
//                          <p className="numbering font-semibold">10)</p>
//                          <p className='numberDes'>By participating in the vote, users agree to comply with all rules and regulations outlined above.</p>
//                     </span>
//                </div >
//           </div >
//      )
// }

// export default Rules
import React from 'react';

function Rules() {
    const rules = [
        "All members who have been registered by Admin are eligible to vote.",
        "Voters must log in using their Email ID and password to cast their vote.",
        "Voters can cast their votes through the online ballot available on the application. Instructions will be provided on the voting page.",
        "All votes are confidential. Voter information will be encrypted and used only for verification purposes.",
        "The application is designed to be accessible to all users. Assistance is available for those who need it by contacting us.",
        "Vote tampering, coercion, and other fraudulent activities are strictly prohibited.",
        "Once your vote is submitted, it cannot be changed.",
        "Only registered users are allowed to vote.",
        "Vote according to your own preferences and do not let others influence your decision.",
        "By participating in the vote, users agree to comply with all rules and regulations outlined above."
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6 inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Rules & Regulations
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
                    <ul className="space-y-6">
                        {rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-4 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mt-1 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg text-gray-200 group-hover:text-white transition-colors duration-300">
                                        {rule}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Decorative elements */}
                <div className="hidden md:block absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
                <div className="hidden md:block absolute -left-10 -top-10 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
            </div>
        </div>
    );
}

export default Rules;