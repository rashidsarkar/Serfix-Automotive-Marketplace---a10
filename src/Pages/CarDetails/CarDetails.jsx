import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Rating, Typography } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { CarsContext, ThemeContext } from "../../MainLayout/MainLayout";
import { AuthContext } from "../../FireBase/AuthProvider";

function CarDetails() {
  const { carID } = useParams();
  const [carsData, setCarsData] = useState([]);

  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://car-web-server-three.vercel.app/cars/${carID}`
        );
        setCarsData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function
  }, [carID]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const itemToCart = {
    brand: carsData?.brand,
    image: carsData?.image,
    name: carsData?.name,
    price: carsData?.price,
    ratingvalue: carsData?.ratingvalue,
    shortDescription: carsData?.shortDescription,
    type: carsData?.type,
    userUID: user?.uid,
  };

  const handleAddToCart = () => {
    axios
      .post("https://car-web-server-three.vercel.app/itemOnCart", itemToCart, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.insertedId) {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Car added to cart",
            text: "The car has been added to the cart.",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors here
      });
  };

  const bgColorStyleCard = {
    backgroundColor: theme === "light" ? "#E5E6E6" : "#15191E",
  };

  const textColorStyle = {
    color: theme === "light" ? "#252d41" : "#f1f1f1",
  };

  return (
    <div className="py-10 pt-[50px]">
      <div className="container mx-auto">
        <div data-aos="zoom-in" className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <img
              src={carsData?.image}
              alt="Product Image"
              className="w-full rounded-lg"
            />
          </div>
          <div data-aos="zoom-in" className="w-full p-8 md:w-1/2">
            <h2 className="text-3xl italic font-semibold">{carsData?.name}</h2>
            <p className="text-xl font-bold text-[#d54242]">
              Price: $ {carsData?.price}
            </p>
            <p className="mt-4">
              <strong>Brand Name:</strong> {carsData?.brand}
            </p>
            <p className="">
              <strong>Type Name:</strong> {carsData?.type}
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold">Product Details</h3>
              <p className="mt-4">
                {carsData?.shortDescription?.length > 330
                  ? carsData?.shortDescription?.slice(0, 330)
                  : carsData?.shortDescription}
                ...
              </p>
            </div>
            <div className="mt-8">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography component="legend" className="">
                  <p className="text-xl font-medium">Rating</p>
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={+carsData?.ratingvalue}
                />
              </Box>
            </div>
            <button
              className="mt-8 bg-[#d54242] text-white font-semibold hover-bg-[#FF6347]  py-2 px-4 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
