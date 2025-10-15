"use client";

import { motion } from "framer-motion";

const MovingBanner = () => {
  const skills = [
    "User Research",
    "UX Design",
    "App Design",
    "Dashboard",
    "Wireframe",
    "Prototype",
    "Brand Identity",
    "Visual Design",
    "Frontend Development",
    "React Development",
  ];

  const extendedSkills = [...skills, ...skills];

  return (
    <div className="w-full bg-primary rounded-xl py-7 flex justify-center items-center">
      {/* White strip */}
      <div className="bg-white h-[45px] w-full overflow-hidden flex items-center rounded-md">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 13, // faster speed
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {extendedSkills.map((skill, index) => (
            <div key={index} className="flex items-center mx-2">
              <span className="text-black text-base md:text-lg font-medium">
                {skill}
              </span>
              <span className="mx-2 text-primary text-lg">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MovingBanner;
