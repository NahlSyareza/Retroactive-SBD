import React from "react"; // Importing the React library
import { Hero } from "../components/hero/Hero"; // Importing the Hero component from the specified path
import { Popular } from "../components/popular/Popular"; // Importing the Popular component from the specified path
import { AboutUs } from "../components/about-us/AboutUs"; // Importing the AboutUs component from the specified path

// Defining the Shop functional component
export const Shop = () => {
  return (
    <div>
      <Hero /> {/*Rendering the Hero component*/}
      <Popular /> {/*Rendering the Popular component*/}
      <AboutUs /> {/*Rendering the AboutUs component*/}
    </div>
  );
};
