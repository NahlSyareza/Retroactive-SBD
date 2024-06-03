import React from "react";

function AboutUs() {
  // Returning JSX to render the component
  return (
    // A div with relative positioning and styling for background and padding
    <div className="relative bg-gray-50 py-12">
      {/* An empty absolute positioned div for potential background elements */}
      <div className="absolute inset-0"></div>
      {/* A relative positioned div for the main content with styling for container, background, and shadows */}
      <div className="relative container mx-auto px-4 bg-white bg-opacity-80 rounded-lg shadow-lg">
        {/* Main heading with styling */}
        <h1 className="text-4xl font-serif mb-4 text-center text-gray-800">
          About Us
        </h1>
        {/* Subheading with styling */}
        <h2 className="text-2xl font-light mb-4 text-center text-gray-600">
          Harmonizing the World Through Music
        </h2>
        {/* A styled horizontal rule element */}
        <div className="border-b-2 border-gray-300 mb-6 mx-auto w-24"></div>
        {/* A paragraph with styling for the main content */}
        <p className="text-lg leading-relaxed font-light text-gray-700 text-center">
          Our brand is dedicated to spreading the joy of music. We create
          instruments and accessories that inspire creativity and bring people
          together, using the highest quality materials and exceptional
          craftsmanship.
        </p>
        {/* A blockquote element with styling */}
        <blockquote className="mt-6 text-center text-gray-600 italic">
          "Music is the universal language of mankind." - Henry Wadsworth
          Longfellow
        </blockquote>
      </div>
    </div>
  );
}

export default AboutUs;
