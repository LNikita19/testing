import React, { useState } from "react";

const OnlineClass = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        { question: "Program Details", answer: "This program covers various aspects of yoga and meditation." },
        { question: "Program Guidelines", answer: "Participants should join on time and follow the instructions carefully." },
        { question: "Health Considerations", answer: "Consult a doctor if you have any health conditions before joining." },
        { question: "Medical Advisory", answer: "People with chronic diseases should take precautions and seek medical advice." },
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="bg-[#FFF4C0] min-h-screen flex flex-col items-center py-10 px-5 rounded-lg">
            <p className='text-[#FD8531] text-lg uppercase'>Online  Classes</p>
            <h1 className='text-[#361A06] text-2xl font-bold text-center mb-6'>Discover & Register<br />For Our Online Classes</h1>

            <div className="border-2 border-[#361A0680] p-6 rounded-xl">
                <div className="bg-white rounded-xl shadow-lg p-5 max-w-2xl w-full ">


                    <img src="/Image2.png" alt="Online Class" className="rounded-xl w-full" />
                    <div className="mt-4 space-y-2">
                        <p className="text-[#FD8531] font-bold uppercase text-sm">Training Online</p>
                        <h2 className="text-lg font-bold">Join Our Upcoming Live-Class</h2>
                        <p className="text-gray-600 mt-2 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <ul className="mt-3 space-y-1 text-gray-700 text-sm">
                            <li><b>From:</b> 04th Jan - 09th Jan, 2025</li>
                            <li><b>Duration:</b> 5 Days</li>
                        </ul>
                    </div>

                    <button
                        className="w-full mt-4 bg-[#FD8531] text-white py-2 rounded-xl text-lg"
                        onClick={() => setShowPopup(true)}
                    >
                        Enroll Now
                    </button>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-[#FFFFFF] flex items-center justify-center p-4">
                    <div className="border-2 border-[#361A0680] py-6 px-10 rounded-lg">

                        <div className="bg-[#FFFFFF] text-[#361A06] p-6 rounded-lg shadow-xl max-w-lg w-full relative">
                            <button className="absolute top-4 right-0 text-[#361A06] border-2 border-black px-1 py-0 rounded-full " onClick={() => setShowPopup(false)}>✖</button>
                            <img src="/Image2.png" alt="Class" className="rounded-lg w-full" />
                            <h2 className="text-lg font-bold mt-3">Join Our Upcoming Live-Class</h2>
                            <ul className="mt-2 space-y-1 text-sm">
                                <li><b>Date:</b> 04th Jan - 09th Jan, 2025</li>
                                <li><b>Session Timings:</b> 06:00 - 09:00 AM</li>
                                <li><b>Language:</b> English</li>
                                <li><b>Program Fee:</b> ₹4500 INR</li>
                            </ul>
                            <h3 className="mt-4 mb-6 text-lg font-bold">FAQs (Important Please Read)</h3>
                            <div className="mt-2 text-[#361A06]">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="mb-2  ">
                                        <button
                                            className="w-full text-left bg-[#ffff] p-2 rounded-lg flex justify-between items-center text-[#361A06] border-2 border-[#361A06]"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            {faq.question}
                                            <span className="text-xs">{openFAQ === index ? "▲" : "▼"}</span>
                                        </button>
                                        {openFAQ === index && <p className="p-2 bg-[#fff] text-sm">{faq.answer}</p>}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2">
                                <button className="px-4 py-2 border border-white text-white rounded-lg">Contact us</button>
                                <button className="px-4 py-2 border border-white text-white rounded-lg">Watch Demo on YouTube</button>
                            </div>
                            <button className="w-full bg-[#FD8531] text-white py-2 rounded-lg text-lg">Book Now</button>
                        </div>
                    </div>
                </div>
            )}


            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-x-6 mt-8">
                {/* Left Section - Text */}
                <div className="max-w-sm text-center md:text-left px-4">
                    <p className="text-[#FD8531] uppercase text-sm">Instructor</p>
                    <h1 className="text-[#361A06] font-bold text-2xl">
                        Meet Our Talented Instructor
                    </h1>
                    <div className="text-[#361A06] space-y-4">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                        </p>
                        <p>
                            Dummy. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                        </p>
                    </div>
                </div>

                {/* Right Section - Image */}
                <div className="relative flex justify-center items-center w-full md:w-auto">
                    <img
                        src="/Circle.png"
                        alt="Round Background"
                        className="absolute w-[250px] sm:w-[350px] md:w-[500px] lg:w-[600px] -opacity-10"
                    />
                    <img
                        src="/Person.png"
                        alt="Person"
                        className="relative z-10 w-[150px] sm:w-[250px] md:w-[350px] lg:w-[450px] max-w-full"
                    />
                </div>
            </div>

        </div>
    );
};

export default OnlineClass;
