import { Box, Rating, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Banar from "../../Components/Banar";
import axios from "axios";
import swal from "sweetalert";
import { CarsContext, ThemeContext } from "../../MainLayout/MainLayout";

function AddProduct() {
  const [ratingvalue, setRatingvalue] = useState(2);
  const { fetchCarsData, carsData, fetchItemOnCartData } =
    useContext(CarsContext);
  console.log(fetchCarsData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Extract values from the form data
    const image = form.get("image");
    const name = form.get("name");
    const brand = form.get("brand");
    const type = form.get("type");
    const price = form.get("price");
    const shortDescription = form.get("shortDescription");

    // Create an object with the form data
    const productData = {
      image,
      name,
      brand,
      type,
      price,
      shortDescription,
      ratingvalue,
    };

    axios
      .post("https://car-web-server-three.vercel.app/cars", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.insertedId) {
          // Refresh the coffeeData
          // fetchCoffeeData();
          fetchCarsData();
          fetchItemOnCartData();

          swal("Success", "Product added successfully!", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Error", "Failed to add the product.", "error");

        // Handle any errors here
      });

    // You can do something with the productData, like sending it to a server

    // Reset the form fields
    e.currentTarget.reset();
  };
  //#2C2929
  // #CBD5E1

  const { theme, setTheme } = useContext(ThemeContext);
  const bgColorStyle = {
    backgroundColor: theme === "light" ? "#cbd5e1" : "#2c2929",
  };
  return (
    <div>
      <Banar
        image="https://i.ibb.co/4RPqt5B/pexels-mike-bird-241316.jpg"
        title="SELL YOUR CAR"
        decpt="Quick and Easy Car Listing"
      ></Banar>

      <div
        className="p-3"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div
          style={bgColorStyle}
          className="mx-auto max-w-lg my-6 p-6  rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4 ">Add Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">Name:</label>
              <input
                required
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Image:</label>
              <input
                required
                type="text"
                name="image"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Brand Name:</label>
              <select
                name="brand"
                className="w-full border border-gray-300 rounded p-2 select select-bordered"
              >
                <option value="Toyota">Toyota</option>
                <option value="Ford">Ford</option>
                <option value="Honda">Honda</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Nissan">Nissan</option>
                {/* Add more brand options here */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Type Name:</label>
              <select
                name="type"
                className="w-full border border-gray-300 rounded p-2 select select-bordered"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="SportsCar">Sports Car</option>
                <option value="OffRoad">Off-Road</option>
                <option value="Sedan">Sedan</option>
                {/* Add more type options here */}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Price:</label>
              <input
                required
                type="text"
                name="price"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Short Description:</label>
              <textarea
                required
                name="shortDescription"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4 mx-auto text-center">
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Typography
                  component="legend"
                  fontWeight={600}
                  className="font-semibold"
                >
                  Rating
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={ratingvalue}
                  onChange={(event, newValue) => {
                    setRatingvalue(newValue);
                  }}
                />
              </Box>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-block rounded bg-[#d54242] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-[#FF6347] hover:shadow-lg focus:bg-[#d54242] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#d54242] active:shadow-lg dark:shadow-md dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-md"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
