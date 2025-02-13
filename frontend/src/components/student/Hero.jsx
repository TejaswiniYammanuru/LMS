import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="font-bold text-gray-900 max-w-4xl mx-auto text-3xl md:text-5xl relative leading-tight">
        Empower your future with the courses designed to{" "}
        <div className="relative inline-block">
          <span className="text-blue-600">fit your choice.</span>
          <img
            src={assets.sketch}
            alt="sketch"
            className="md:block hidden absolute -bottom-5 -right-4 w-32"
          />
        </div>
      </h1>
      <p className="md:block hidden text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        We bring together world-class instructors, interactive content, and a supportive
        community to help you achieve your personal and professional goals.
      </p>

      <p className="md:hidden text-gray-600 max-w-sm mx-auto text-base">
        We bring together world-class instructors to help you achieve your professional goals.
      </p>
      <SearchBar/>
    </div>
  );
};

export default Hero;