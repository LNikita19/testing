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
        <div className="bg-[#FEF2D7] min-h-screen flex flex-col items-center py-10 px-5">
            <p className='text-[#FD8531] text-lg uppercase'>Online Classes</p>
            <h1 className='text-[#361A06] text-2xl font-bold text-center mb-6'>Discover & Register<br />For Our Online Classes</h1>

            <div className="bg-white rounded-xl shadow-lg p-5 max-w-lg w-full">
                <img src="/image2.png" alt="Online Class" className="rounded-xl w-full" />
                <div className="mt-4">
                    <p className="text-[#FD8531] font-bold uppercase text-sm">Training Online</p>
                    <h2 className="text-lg font-bold">Join Our Upcoming Live-Class</h2>
                    <p className="text-gray-600 mt-2 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <ul className="mt-3 space-y-1 text-gray-700 text-sm">
                        <li><b>From:</b> 04th Jan - 09th Jan, 2025</li>
                        <li><b>Duration:</b> 5 Days</li>
                    </ul>
                </div>
                <button
                    className="w-full mt-4 bg-[#FD8531] text-white py-2 rounded-lg text-lg"
                    onClick={() => setShowPopup(true)}
                >
                    Enroll Now
                </button>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-[#4E3B31] text-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
                        <button className="absolute top-4 right-4 text-white" onClick={() => setShowPopup(false)}>✖</button>
                        <img src="/your-image-path.jpg" alt="Class" className="rounded-lg w-full" />
                        <h2 className="text-lg font-bold mt-3">Join Our Upcoming Live-Class</h2>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><b>Date:</b> 04th Jan - 09th Jan, 2025</li>
                            <li><b>Session Timings:</b> 06:00 - 09:00 AM</li>
                            <li><b>Language:</b> English</li>
                            <li><b>Program Fee:</b> ₹4500 INR</li>
                        </ul>
                        <h3 className="mt-4 text-lg font-bold">FAQs (Important Please Read)</h3>
                        <div className="mt-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="mb-2">
                                    <button
                                        className="w-full text-left bg-[#3C2E25] p-2 rounded-lg flex justify-between items-center text-white"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        {faq.question}
                                        <span className="text-xs">{openFAQ === index ? "▲" : "▼"}</span>
                                    </button>
                                    {openFAQ === index && <p className="p-2 bg-[#2B211C] text-sm">{faq.answer}</p>}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-5">
                            <button className="px-4 py-2 border border-white text-white rounded-lg">Contact us</button>
                            <button className="px-4 py-2 border border-white text-white rounded-lg">Watch Demo on YouTube</button>
                        </div>
                        <button className="w-full mt-4 bg-[#FD8531] text-white py-2 rounded-lg text-lg">Book Now</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnlineClass;
