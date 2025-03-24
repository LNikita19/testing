import React, { useState } from "react";
import ContactPopup1 from "./Contactpopup1";

const Combopopup = ({ onClose, program }) => {
    const [showContact, setShowContact] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        { question: "What is this program about?", answer: "This program covers various yoga practices to enhance well-being." },
        { question: "Who can participate?", answer: "Anyone above the age of 14 can participate." },
        { question: "What should I bring?", answer: "Comfortable clothing, yoga mat, and a water bottle." },
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
                <button className="absolute top-4 right-2 text-[#361A06]" onClick={onClose}>✖</button>

                <img src={program.image} alt="Program" className="w-full rounded-xl" />

                <p className="italic text-center text-[#361A06] mt-3">
                    "{program.quote}"<br />
                    — <b>{program.speaker}</b>
                </p>

                <div className="mt-4 text-left">
                    <h3 className="text-orange-500 font-bold uppercase text-sm">About</h3>
                    <h2 className="text-xl font-bold text-[#361A06]">{program.title}</h2>
                    <p className="text-[#361A06] mt-2">{program.description}</p>
                    <ul className="mt-3 space-y-1 text-[#361A06]">
                        <li><b>Date:</b> {program.date}</li>
                        <li><b>Session Timing:</b> {program.timing}</li>
                        <li><b>Language:</b> {program.language}</li>
                        <li><b>Program Fee:</b> {program.fee}</li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-5">
                    <h3 className="text-orange-500 font-bold uppercase text-sm">FAQs</h3>
                    <div className="mt-2">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-2 border-2 border-[#361A0680] rounded-lg">
                                <button
                                    className="w-full text-left   space-y-4 p-2 rounded-lg flex justify-between items-center"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                    <span className="text-xs text-[#361A06B2]">{openFAQ === index ? "▲" : "▼"}</span>
                                </button>
                                {openFAQ === index && <p className="p-2 text-[#361A06]">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between mt-5">
                    <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
                        onClick={() => setShowContact(true)}>
                        Contact us
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                        onClick={() => window.open("https://forms.gle/your-google-form-link", "_blank")}>
                        Register Now
                    </button>
                </div>
            </div>

            {showContact && <ContactPopup1 onClose={() => setShowContact(false)} />}
        </div>
    );
};

export default Combopopup;
