import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Pages/Footer/Footer";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CarsContext = createContext(null);
function MainLayout() {
  const [carsData, setCarsData] = useState([]);
  const [itemOnCartData, setitemOnCartData] = useState([]);

  const fetchCarsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cars");
      setCarsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchItemOnCartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/itemOnCart");
      setitemOnCartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCarsData();
    fetchItemOnCartData();
  }, []);

  const contextInfo = {
    carsData,
    fetchCarsData,
    fetchItemOnCartData,
    itemOnCartData,
    setitemOnCartData,
  };
  // console.log(itemOnCartData);
  return (
    <CarsContext.Provider value={contextInfo}>
      <div className="mx-auto max-w-7xl">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </CarsContext.Provider>
  );
}

export default MainLayout;
