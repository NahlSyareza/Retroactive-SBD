import React, { useState, useEffect } from "react"; // Importing React and hooks from the React library
import { Item } from "../item/Item"; // Importing the Item component
import { toast } from "react-toastify"; // Importing toast for notifications

// Defining the Popular functional component
export const Popular = () => {
  const [bgColor, setBgColor] = useState("bg-white"); // State for background color
  const [itemShop, setItemShop] = useState([]); // State for storing items

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/item`); // Fetching data from API
      const result = await response.json(); // Parsing JSON response
      setItemShop(result); // Updating state with fetched data
    } catch (err) {
      toast.error("Error fetching data"); // Showing error notification
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect to change background color on scroll
  useEffect(() => {
    const changeColorOnScroll = () => {
      const scrollPosition = window.scrollY; // Getting the current scroll position
      if (scrollPosition < 150) setBgColor("bg-white");
      else if (scrollPosition < 300) setBgColor("bg-gray-100");
      else if (scrollPosition < 450) setBgColor("bg-gray-200");
      else setBgColor("bg-gray-300");
    };

    window.addEventListener("scroll", changeColorOnScroll); // Adding scroll event listener
    return () => window.removeEventListener("scroll", changeColorOnScroll); // Cleaning up the event listener
  }, []);

  return (
    <div
      className={`${bgColor} transition-colors duration-500 ease-in-out py-12`}
    >
      {" "}
      {/*Div with dynamic background color and transition*/}
      <div className="container mx-auto px-4">
        {" "}
        {/*Container for centering content*/}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {" "}
          {/*Grid layout for items*/}
          {itemShop &&
            itemShop.map(
              (
                item,
                index // Mapping through items to render them
              ) => (
                <Item
                  key={index}
                  {...item}
                  className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                /> // Item component with hover effects
              )
            )}
        </div>
      </div>
    </div>
  );
};
