import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../store/slices/products/ProductsSlice";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Products from "../components/Products";
import Footer from "../components/Footer";
import ProductAccessibles from "../components/ProductAccessibles"; 
import NavbarRegister from "../components/NavbarRegister";

const HomeRegister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <NavbarRegister />
      <About />
      <div className="products-section">
        <h2>Welcome Back!</h2>
        <h3>Enjoy exclusive deals for registered users.</h3>
        <ProductAccessibles />
      </div>
      <Footer />
    </div>
  );
};

export default HomeRegister;
