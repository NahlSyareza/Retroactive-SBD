import React, { useState, useEffect } from "react"; // Importing React and hooks from the React library
import { Item } from "../item/Item"; // Importing the Item component
import { toast } from "react-toastify"; // Importing toast for notifications

// Defining the Popular functional component
function Popular() {
  const [itemShop, setItemShop] = useState([]); // State for storing items

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:1466/shop`); // Fetching data from API
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

  return (
    <div className={`transition-colors duration-500 ease-in-out py-12`}>
      {" "}
      {/*Div with dynamic background color and transition*/}
      <div className="container mx-auto px-4">
        {" "}
        {/*Container for centering content*/}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
}

export default Popular;
