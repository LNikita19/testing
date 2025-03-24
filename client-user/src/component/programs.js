// import React, { useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import PopupProgram from "./program/PopupProgram";

// const programsData = [
//     {
//         id: 1,
//         date: "12 Dec 2024",
//         title: "Surya Kriya",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//     },
//     {
//         id: 2,
//         date: "17 Dec 2024",
//         title: "Angamardana",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//     },
//     {
//         id: 3,
//         date: "23 Dec 2024",
//         title: "Yogasanas & Surya Kriya",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//         badge: "Combo", // Combo Program
//     },
//     {
//         id: 4,
//         date: "27 Dec 2024",
//         title: "Surya Kriya (Telugu)",
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//         image: "/image1.png",
//     },
// ];

// const Programs = () => {
//     const [selectedProgram, setSelectedProgram] = useState(null);

//     return (
//         <div className="px-6 py-10 bg-[#FFFBEF]">
//             {/* Header Section */}
//             <div className="text-center">
//                 <p className="text-[#FD8531] font-bold uppercase">Our Classes</p>
//                 <h1 className="text-[#361A06] text-3xl font-bold mt-2">
//                     Discover & Register <br /> For Our Classes
//                 </h1>
//             </div>

//             {/* Program Cards */}
//             <div className="flex justify-center mt-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {programsData.map((program) => (
//                         <div
//                             key={program.id}
//                             className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-80"
//                         >
//                             {/* Button at the Start */}


//                             {/* Program Image */}
//                             <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />

//                             {/* Date Badge */}
//                             <div className="absolute top-3 left-3 bg-[#FDF7C4] text-[#361A06] text-sm px-3 py-1 rounded-full">
//                                 {program.date}
//                             </div>

//                             {/* Combo Badge */}
//                             {program.badge && (
//                                 <div className="absolute top-3 right-3 bg-[#FD8531] text-white text-sm px-3 py-1 rounded-full">
//                                     {program.badge}
//                                 </div>
//                             )}

//                             {/* Program Details */}
//                             <div className="p-4 flex-1">
//                                 <h2 className="text-[#361A06] font-bold text-xl">{program.title}</h2>
//                                 <p className="text-[#361A06] mt-2">{program.description}</p>
//                             </div>
//                             <div className="p-4 text-left">
//                                 <button
//                                     className="bg-[#361A06] text-white py-2 px-4 rounded-full flex items-center gap-2"
//                                     onClick={() => setSelectedProgram(program)} // ✅ Fix: Set selected program
//                                 >
//                                     Know More
//                                     <img src="/Vector.png" alt="Arrow Icon" className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex justify-center mt-8 space-x-3">
//                 <button className="p-2 rounded-full bg-[#FDF7C4] text-[#361A06]">
//                     <FaChevronLeft />
//                 </button>
//                 <button className="p-2 rounded-full bg-[#FDF7C4] text-[#361A06]">
//                     <FaChevronRight />
//                 </button>
//             </div>
//             {/* Popup Program - Conditionally Rendered */}
//             {selectedProgram && <PopupProgram onClose={() => setSelectedProgram(null)} program={selectedProgram} />}
//         </div>
//     );
// };

// export default Programs;
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PopupProgram from "./program/PopupProgram";
import Combopopup from "./program/Combopopup";

const programsData = [
    {
        id: 1,
        date: "12 Dec 2024",
        title: "Surya Kriya",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "/image1.png",
    },
    {
        id: 2,
        date: "17 Dec 2024",
        title: "Angamardana",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "/image1.png",
    },
    {
        id: 3,
        date: "23 Dec 2024",
        title: "Yogasanas & Surya Kriya",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "/image1.png",
        badge: "Combo", // Combo Program
    },
    {
        id: 4,
        date: "27 Dec 2024",
        title: "Surya Kriya (Telugu)",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "/image1.png",
    },
];

const Programs = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isCombo, setIsCombo] = useState(false);

    const handleKnowMoreClick = (program) => {
        if (program.badge === "Combo") {
            setIsCombo(true);
        } else {
            setIsCombo(false);
        }
        setSelectedProgram(program);
    };

    return (
        <div className="px-6 py-10 bg-[#FFFBEF]">
            {/* Header Section */}
            <div className="text-center">
                <p className="text-[#FD8531] font-bold uppercase">Our Classes</p>
                <h1 className="text-[#361A06] text-3xl font-bold mt-2">
                    Discover & Register <br /> For Our Classes
                </h1>
            </div>

            {/* Program Cards */}
            <div className="flex justify-center mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {programsData.map((program) => (
                        <div
                            key={program.id}
                            className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-80"
                        >
                            {/* Program Image */}
                            <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />

                            {/* Date Badge */}
                            <div className="absolute top-3 left-3 bg-[#FDF7C4] text-[#361A06] text-sm px-3 py-1 rounded-full">
                                {program.date}
                            </div>

                            {/* Combo Badge */}
                            {program.badge && (
                                <div className="absolute top-3 right-3 bg-[#FD8531] text-white text-sm px-3 py-1 rounded-full">
                                    {program.badge}
                                </div>
                            )}

                            {/* Program Details */}
                            <div className="p-4 flex-1">
                                <h2 className="text-[#361A06] font-bold text-xl">{program.title}</h2>
                                <p className="text-[#361A06] mt-2">{program.description}</p>
                            </div>

                            <div className="p-4 text-left">
                                <button
                                    className="bg-[#361A06] text-white py-2 px-4 rounded-full flex items-center gap-2"
                                    onClick={() => handleKnowMoreClick(program)}
                                >
                                    Know More
                                    <img src="/Vector.png" alt="Arrow Icon" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 space-x-3">
                <button className="p-2 rounded-full bg-[#FDF7C4] text-[#361A06]">
                    <FaChevronLeft />
                </button>
                <button className="p-2 rounded-full bg-[#FDF7C4] text-[#361A06]">
                    <FaChevronRight />
                </button>
            </div>

            {/* Render appropriate popup */}
            {selectedProgram && isCombo ? (
                <Combopopup onClose={() => setSelectedProgram(null)} program={selectedProgram} />
            ) : selectedProgram ? (
                <PopupProgram onClose={() => setSelectedProgram(null)} program={selectedProgram} />
            ) : null}
        </div>
    );
};

export default Programs;
