import React from "react";

const ContactPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-[#FFF9E1] rounded-3xl shadow-lg  w-full max-w-2xl relative flex">

                {/* Close Button */}
                <button className="absolute top-4 right-4 bg-[#FFF9E1] text-[#361A06] border-[#FD8531] w-8 h-8 rounded-full flex items-center justify-center"
                    onClick={onClose}>
                    ✖
                </button>

                {/* Left Side - Form */}
                <div className="w-1/2 p-6">
                    {/* Logo */}
                    <img src="/Logo.png" alt="Logo" className="w-32 mb-4" />

                    <h2 className="text-xl text-[#361A06] font-extrabold">Got a question?</h2>
                    <p className="text-xl text-[#361A06] font-extrabold">Contact us...</p>

                    <form className="mt-4 space-y-8">
                        <div className="flex space-x-6">
                            <input type="text" placeholder="First name*"
                                className="w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                            <input type="text" placeholder="Last name*"
                                className="w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                        </div>
                        <div className="flex space-x-6">
                            <input type="email" placeholder="Email address*"
                                className="w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                            <input type="text" placeholder="Your number*"
                                className="w-1/2 pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />
                        </div>
                        <input placeholder="Message*"
                            className="w-full pb-2 border-b border-[#FD8531] text-[#361A06] bg-transparent outline-none placeholder-[#361A06]" />

                        <button className="w-full bg-[#361A06] text-[#FFF9E1] p-2 rounded-lg">Submit</button>
                    </form>

                </div>

                {/* Right Side - Image */}
                <div className="w-1/2">
                    <img src="/contact.png" alt="Contact" className="w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;
