import React from "react";
import music_note_icon from "../../assets/music_note_icon.png";

export const Hero = () => {
  return (
    <div className="relative h-screen bg-gray-50">
      {" "}
      {/*A full-screen div with a gray background*/}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-10"></div>{" "}
      {/*Semi-transparent overlay*/}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 text-left">
        {/* A heading with a gradient text effect */}
        <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-400 to-black text-transparent bg-clip-text">
          Feel the Rhythm!
        </h2>
        {/* A flex container for the subtitle and icon */}
        <div className="mt-4 flex items-center">
          <img src={music_note_icon} alt="Music Note Icon" className="h-64 my-6 w-auto" /> {/* Updated icon to a music note */}
        </div>
        <p className="text-sm font-light text-gray-700 italic">
          Discover tunes for every mood
        </p>{" "}
        {/* Updated text for music theme */}
      </div>
    </div>
  );
};
