import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
    "/image1.png",
    "/Image3.png",
    "/Image1.png",
    "/Image3.png",
    "/Image1.png",
    "/image3.png"
];

const ImageSlider = () => {
    const [index, setIndex] = useState(0);

    const prevSlide = () => {
        setIndex(index === 0 ? images.length - 2 : index - 2);
    };

    const nextSlide = () => {
        setIndex(index + 2 >= images.length ? 0 : index + 2);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="flex overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out gap-2"
                    style={{ transform: `translateX(-${index * 50}%)` }}
                >
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Slide ${i + 1}`}
                            className="w-1/2 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
                <FaChevronLeft />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default ImageSlider;
