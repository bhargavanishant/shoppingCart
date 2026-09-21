import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";

import Login from "./pages/Login/Login";
import Checkout from './pages/Checkout/Checkout';

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<Categories />} />
      <Route path="/products/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
    
  );
}

