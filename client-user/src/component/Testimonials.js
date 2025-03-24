import React from "react";

const testimonials = [
    {
        id: 1,
        name: "Esther Howard",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
        bgColor: "bg-[#FDF7C4]",
        large: true,
    },
    {
        id: 2,
        name: "Courtney Henry",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "As an early stage startup I’m really loving using Polo – great balance of flexibility and prescriptiveness",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 3,
        name: "Cody Fisher",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 4,
        name: "Devon Lane",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "Let’s be honest, most CRMs suck. Overcomplicated, expensive, and you have to bend to their will…not the other way around. I am a huge fan of Polo – their product is rock-solid, customer support is AAA, and it’s *very* flexible and simple.",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 5,
        name: "Kathryn Murphy",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "I’ve been using Polo to track applicants, manage my deal pipeline and manage the associated notes/tasks. The use-cases are unlimited; it truly feels like the Notion of CRM.",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 6,
        name: "Floyd Miles",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 7,
        name: "Dianne Russell",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 8,
        name: "Marvin McKinney",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "Let’s be honest, most CRMs suck. Overcomplicated, expensive, and you have to bend to their will…not the other way around. I am a huge fan of Polo – their product is rock-solid, customer support is AAA, and it’s *very* flexible and simple.",
        bgColor: "bg-[#FDF7C4]",
    },
    {
        id: 9,
        name: "Guy Hawkins",
        profession: "Product Manager, Circle",
        img: "/Profile.png",
        comment: "We use Polo on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI.",
        bgColor: "bg-[#FDF7C4]",
    },
];

const Testimonials = () => {
    return (
        <section className="py-12 px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <p className="text-[#FD8531] text-sm font-semibold">TESTIMONIALS</p>
                <h1 className="text-[#361A06] text-3xl font-bold mt-2">
                    What Our Clients Say About Us
                </h1>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className={`p-6 rounded-xl shadow-md ${testimonial.bgColor}`}>

                        <div className="flex items-center gap-4">
                            <img
                                src={testimonial.img}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                <p className="text-sm text-[#361A06] font-semibold">{testimonial.profession}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm">{testimonial.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;





