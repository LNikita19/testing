import React, { useState } from "react";
import ContactPopup1 from "./Contactpopup1";

const PopupProgram = ({ onClose, program }) => {
    const defaultData = {
        image: "/program-image.jpg",
        quote: "Angamardana is a powerful system to bring the human mechanism to ultimate health and well-being.",
        speaker: "Sadhguru",
        title: "Default Program",
        description: "Lorem Ipsum is simply dummy text.",
        date: "04th Jan - 09th Jan 2025",
        timing: "06:00 - 09:00 AM",
        language: "English",
        fee: "₹ 8500 INR",
    };

    const displayData = program || defaultData;
    const [openFAQ, setOpenFAQ] = useState(null);
    const [showContact, setShowContact] = useState(false);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
                {/* Close Button */}
                <button className="absolute top-4 right-2 text-[#361A06]" onClick={onClose}>✖</button>

                {/* Program Details */}
                <img src={displayData.image} alt="Program" className="w-full rounded-xl" />

                {/* Quote */}
                <p className="italic text-center text-[#361A06] mt-3">
                    "{displayData.quote}"<br />
                    — <b>{displayData.speaker}</b>
                </p>

                {/* Program Details */}
                <div className="mt-4 text-left">
                    <h3 className="text-orange-500 font-bold uppercase text-sm">About</h3>
                    <h2 className="text-xl font-bold text-[#361A06]">{displayData.title}</h2>
                    <p className="text-[#361A06] mt-2">{displayData.description}</p>

                    <ul className="mt-3 space-y-1 text-[#361A06]">
                        <li><b>Date:</b> {displayData.date}</li>
                        <li><b>Session Timing:</b> {displayData.timing}</li>
                        <li><b>Language:</b> {displayData.language}</li>
                        <li><b>Program Fee:</b> {displayData.fee}</li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-5">
                    <h3 className="font-bold text-lg">FAQs (Important Please Read)</h3>
                    {["Program Details", "Program Guidelines", "Health Considerations", "Medical Advisory"].map((title, index) => (
                        <div key={index} className="mb-2 border-2 border-[#361A0680] rounded-lg">
                            <button
                                className="w-full text-left px-4 py-2 bg-gray-100 flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                {title}                                     <span className="text-xs text-[#361A06B2]">{openFAQ === index ? "▲" : "▼"}</span>

                            </button>
                            {openFAQ === index && (
                                <p className="px-4 py-2 bg-white border-t">Details about {title}...</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-5">
                    {/* Contact Us Button */}
                    <button
                        className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
                        onClick={() => setShowContact(true)}
                    >
                        Contact us
                    </button>

                    {/* Register Now Button (Opens Google Form) */}
                    <button
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                        onClick={() => window.open("https://forms.gle/your-google-form-link", "_blank")}
                    >
                        Register Now
                    </button>
                </div>
            </div>

            {/* Show Contact Popup When Needed */}
            {showContact && <ContactPopup1 onClose={() => setShowContact(false)} />}
        </div>
    );
};

export default PopupProgram;
