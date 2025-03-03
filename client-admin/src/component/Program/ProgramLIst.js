import { useState, useEffect } from "react";

const ProgramList = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch("/api/programs"); // Replace with your actual API
            const data = await response.json();
            setPrograms(data);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/programs/${id}`, { method: "DELETE" });
            setPrograms(programs.filter(program => program.id !== id));
        } catch (error) {
            console.error("Error deleting program:", error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#361A06]">Programs</h1>
                <button 
                    className="bg-[#361A06] text-white px-4 py-2 rounded-md"
                    onClick={() => window.location.href = "/add-program"}
                >
                    ADD NEW PROGRAM
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {programs.map((program) => (
                    <div key={program.id} className="bg-[#FEEBC8] p-4 rounded-2xl shadow-lg">
                        <div className="relative">
                            <img src={program.image} alt={program.title} className="rounded-lg w-full h-40 object-cover" />
                            <span className="absolute top-2 left-2 bg-[#361A06] text-white text-xs px-3 py-1 rounded-md">
                                {program.date}
                            </span>
                        </div>
                        <h2 className="text-lg font-bold text-[#361A06] mt-2">{program.title}</h2>
                        <p className="text-sm text-gray-600">{program.description}</p>
                        <div className="mt-3">
                            <button 
                                className="bg-white border w-full py-2 rounded-md text-[#361A06] mb-2"
                                onClick={() => window.location.href = `/edit-program/${program.id}`}
                            >
                                Edit Program
                            </button>
                            <button 
                                className="bg-[#361A06] text-white w-full py-2 rounded-md"
                                onClick={() => handleDelete(program.id)}
                            >
                                Delete Program
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramList;
